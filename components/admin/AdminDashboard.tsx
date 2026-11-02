
"use client";

import { useEffect, useState, type ReactNode } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  Inbox,
  ImagePlus,
  Settings,
  Menu,
  X,
  Plus,
  Trash2,
  LogOut,
  Pencil,
  Eye,
} from "lucide-react";
import { categories } from "@/lib/categories";

/* ---------- Types ---------- */

type View = "Dashboard" | "Projects" | "Inquiries" | "Gallery" | "Settings";
type Project = { id: number; title: string; category: string; description?: string; image?: string };
type Photo = { id: number; url: string };
type Inquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  date: string;
  status: "New" | "Replied";
};
type Site = {
  title: string;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  instagramPersonal: string;
  location: string;
  serviceLine: string;
  deliveryNote: string;
};
type ModalType = "project" | { inquiry: Inquiry } | null;
type Msg = { type: "error" | "ok"; text: string } | null;

const nav: { label: View; icon: typeof LayoutDashboard }[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Projects", icon: FolderKanban },
  { label: "Inquiries", icon: Inbox },
  { label: "Gallery", icon: ImagePlus },
  { label: "Settings", icon: Settings },
];

const gradients = [
  "from-[#107F94] to-[#003D40]",
  "from-[#2F3035] to-[#003D40]",
  "from-[#107F94] to-[#2F3035]",
];

/* ---------- Shared styles ---------- */

const panel = "rounded-xl border border-[#107F94]/30 bg-[#FFFFFF] text-[#000000]";

const goldBtn =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#003D40] px-4 py-2 text-sm font-semibold text-[#FFFFFF] transition hover:bg-[#107F94] disabled:cursor-not-allowed disabled:opacity-50";

const ghostBtn =
  "inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg border border-[#107F94]/50 bg-[#FFFFFF] px-4 py-2 text-sm font-medium text-[#000000] transition hover:bg-[#107F94]/10 disabled:cursor-not-allowed disabled:opacity-50";

const input =
  "min-h-[44px] w-full rounded-lg border border-[#107F94]/30 bg-[#FFFFFF] px-3 py-2 text-sm text-[#000000] outline-none placeholder:text-[#2F3035]/60 focus:border-[#107F94]";

const fileInput =
  "block w-full text-sm text-[#000000] file:mr-3 file:min-h-[44px] file:rounded-lg file:border-0 file:bg-[#003D40] file:px-4 file:font-semibold file:text-[#FFFFFF]";

/* ---------- Helpers ---------- */

async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, init);
  const data = await res.json().catch(() => ({}));

  if (res.status === 401) {
    window.location.href = "/admin/login";
    throw new Error("Session expired. Please log in again.");
  }

  if (!res.ok) {
    throw new Error(
      (data as { error?: string }).error ||
        `Request failed (${res.status}) for ${url}`
    );
  }

  return data as T;
}

const jsonInit = (method: string, body: unknown): RequestInit => ({
  method,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(body),
});

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

/* ---------- Sidebar ---------- */

function SidebarContent({
  active,
  newCount,
  onSelect,
  onLogout,
}: {
  active: View;
  newCount: number;
  onSelect: (v: View) => void;
  onLogout: () => void;
}) {
  return (
    <div className="flex h-full flex-col bg-[#003D40]">
      <div className="flex items-center gap-3 px-5 py-6">
        <span className="flex h-10 w-5 shrink-0 items-center justify-center rounded-full border border-[#FFFFFF] font-serif text-sm font-bold text-[#FFFFFF]" />
        <div className="min-w-0 leading-tight">
          <p className="truncate font-serif text-lg text-[#FFFFFF]">
            Royal Metalworks
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {nav.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => onSelect(label)}
            className={`flex min-h-[44px] w-full items-center gap-3 rounded-lg px-3 text-sm transition ${
              active === label
                ? "bg-[#FFFFFF] font-semibold text-[#000000]"
                : "text-[#FFFFFF] hover:bg-[#107F94] hover:text-[#FFFFFF]"
            }`}
          >
            <Icon size={18} className="shrink-0" />
            <span className="flex-1 text-left">{label}</span>

            {label === "Inquiries" && newCount > 0 && (
              <span className="rounded-full bg-[#FFFFFF] px-2 text-sm font-semibold text-[#000000]">
                {newCount}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-3">
        <button
          onClick={onLogout}
          className="flex min-h-[44px] w-full items-center gap-3 rounded-lg px-3 text-sm text-[#FFFFFF] transition hover:bg-[#107F94]"
        >
          <LogOut size={18} className="shrink-0" />
          Log out
        </button>
      </div>
    </div>
  );
}

/* ---------- Modal ---------- */

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl border border-[#107F94]/40 bg-[#FFFFFF] p-5 text-[#000000]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <h3 className="font-serif text-lg text-[#000000]">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#000000] transition hover:bg-[#107F94]/10"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/* ---------- Main component ---------- */

export default function AdminDashboard() {
  const [view, setView] = useState<View>("Dashboard");
  const [drawer, setDrawer] = useState(false);
  const [modal, setModal] = useState<ModalType>(null);
  const [msg, setMsg] = useState<Msg>(null);
  const [busy, setBusy] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  const [site, setSite] = useState<Site>({
    title: "",
    phone: "",
    whatsapp: "",
    email: "",
    instagram: "",
    instagramPersonal: "",
    location: "",
    serviceLine: "",
    deliveryNote: "",
  });

  const [draft, setDraft] = useState({
    title: "",
    category: categories[0],
    description: "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const fail = (e: unknown) =>
    setMsg({
      type: "error",
      text: e instanceof Error ? e.message : "Something went wrong",
    });

  /* Lock page scroll while drawer or modal is open; Esc closes them */
  useEffect(() => {
    document.body.style.overflow = drawer || modal ? "hidden" : "";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDrawer(false);
        setModal(null);
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [drawer, modal]);

  /* Load everything from the server */
  useEffect(() => {
    const load = async () => {
      const [p, ph, q, s] = await Promise.allSettled([
        api<Project[]>("/api/projects"),
        api<Photo[]>("/api/photos"),
        api<Inquiry[]>("/api/inquiries"),
        api<Site>("/api/settings"),
      ]);

      const problems: string[] = [];

      if (p.status === "fulfilled") setProjects(p.value);
      else problems.push(`Projects: ${(p.reason as Error).message}`);

      if (ph.status === "fulfilled") setPhotos(ph.value);
      else problems.push(`Photos: ${(ph.reason as Error).message}`);

      if (q.status === "fulfilled") setInquiries(q.value);
      else problems.push(`Inquiries: ${(q.reason as Error).message}`);

      if (s.status === "fulfilled") setSite(s.value);
      else problems.push(`Settings: ${(s.reason as Error).message}`);

      if (problems.length) {
        setMsg({ type: "error", text: problems.join(" | ") });
      }
    };

    load();
  }, []);

  const newCount = inquiries.filter((q) => q.status === "New").length;

  /* ---------- Actions ---------- */

  const goTo = (v: View) => {
    setView(v);
    setDrawer(false);
    setMsg(null);
  };

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    window.location.href = "/admin/login";
  };

  const pickFile = (f?: File) => {
    if (preview) URL.revokeObjectURL(preview);
    setFile(f ?? null);
    setPreview(f ? URL.createObjectURL(f) : "");
  };

  const closeModal = () => {
    setModal(null);
    setDraft({ title: "", category: categories[0], description: "" });
    pickFile(undefined);
  };

  const openAddProject = () => {
    setMsg(null);
    setModal("project");
  };

  const addProject = async () => {
    if (!draft.title.trim()) {
      setMsg({ type: "error", text: "Please enter a project title" });
      return;
    }

    setBusy(true);
    setMsg(null);

    try {
      const body = new FormData();
      body.append("title", draft.title.trim());
      body.append("category", draft.category);
      body.append("description", draft.description.trim());

      if (file) body.append("image", file);

      const created = await api<Project>("/api/projects", {
        method: "POST",
        body,
      });

      setProjects((p) => [created, ...p]);
      closeModal();
      setMsg({ type: "ok", text: "Project added" });
    } catch (e) {
      fail(e);
    } finally {
      setBusy(false);
    }
  };

  const deleteProject = async (id: number) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await api(`/api/projects?id=${id}`, { method: "DELETE" });
      setProjects((list) => list.filter((x) => x.id !== id));
    } catch (e) {
      fail(e);
    }
  };

  const uploadPhotos = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setBusy(true);
    setMsg(null);

    try {
      const body = new FormData();
      Array.from(files).forEach((f) => body.append("images", f));

      const added = await api<Photo[]>("/api/photos", {
        method: "POST",
        body,
      });

      setPhotos((p) => [...added, ...p]);
      setMsg({ type: "ok", text: `${added.length} photo(s) uploaded` });
    } catch (e) {
      fail(e);
    } finally {
      setBusy(false);
    }
  };

  const deletePhoto = async (id: number) => {
    if (!window.confirm("Delete this photo?")) return;

    try {
      await api(`/api/photos?id=${id}`, { method: "DELETE" });
      setPhotos((list) => list.filter((x) => x.id !== id));
    } catch (e) {
      fail(e);
    }
  };

  const toggleStatus = async (q: Inquiry) => {
    try {
      const updated = await api<Inquiry>(
        "/api/inquiries",
        jsonInit("PATCH", {
          id: q.id,
          status: q.status === "New" ? "Replied" : "New",
        })
      );

      setInquiries((list) =>
        list.map((x) => (x.id === q.id ? updated : x))
      );
    } catch (e) {
      fail(e);
    }
  };

  const deleteInquiry = async (id: number) => {
    if (!window.confirm("Delete this inquiry?")) return;

    try {
      await api(`/api/inquiries?id=${id}`, { method: "DELETE" });
      setInquiries((list) => list.filter((x) => x.id !== id));
      setModal(null);
    } catch (e) {
      fail(e);
    }
  };

  const saveSite = async () => {
    setBusy(true);
    setMsg(null);

    try {
      const saved = await api<Site>("/api/settings", jsonInit("PUT", site));
      setSite(saved);
      setMsg({ type: "ok", text: "Site info saved" });
    } catch (e) {
      fail(e);
    } finally {
      setBusy(false);
    }
  };

  /* ---------- Reusable pieces ---------- */

  const projectGrid = (list: Project[]) => (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-3 xl:gap-4">
      {list.map((p, i) => (
        <article
          key={p.id}
          className="overflow-hidden rounded-lg border border-[#107F94]/30 bg-[#FFFFFF] text-[#000000]"
        >
          <div
            className={`relative aspect-[4/3] w-full bg-gradient-to-br ${gradients[i % gradients.length]}`}
            style={
              p.image
                ? {
                    backgroundImage: `url(${p.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : undefined
            }
          >
            <button
              onClick={() => deleteProject(p.id)}
              aria-label={`Delete ${p.title}`}
              className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-lg bg-black/60 text-[#FFFFFF] transition hover:text-red-300"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="p-3">
            <p className="truncate text-sm font-medium">{p.title}</p>
            <p className="truncate text-sm text-[#107F94]">{p.category}</p>
          </div>
        </article>
      ))}

      {list.length === 0 && (
        <p className="col-span-full py-8 text-center text-sm text-[#000000]/60">
          No projects yet. Use Add to create your first project.
        </p>
      )}
    </div>
  );

  const inquiryTable = (list: Inquiry[]) => (
    <div className="overflow-x-auto rounded-lg border border-[#107F94]/30">
      <table className="w-full min-w-[640px] text-left text-sm text-[#000000]">
        <thead className="bg-[#003D40] text-[#FFFFFF]">
          <tr>
            <th className="px-3 py-3 font-medium">Name</th>
            <th className="px-3 py-3 font-medium">Service</th>
            <th className="px-3 py-3 font-medium">Date</th>
            <th className="px-3 py-3 font-medium">Status</th>
            <th className="px-3 py-3 font-medium">Message</th>
          </tr>
        </thead>

        <tbody>
          {list.map((q) => (
            <tr key={q.id} className="border-t border-[#107F94]/20">
              <td className="whitespace-nowrap px-3 py-2">{q.name}</td>
              <td className="whitespace-nowrap px-3 py-2">{q.service || "-"}</td>
              <td className="whitespace-nowrap px-3 py-2">{fmtDate(q.date)}</td>

              <td className="px-3 py-2">
                <button
                  onClick={() => toggleStatus(q)}
                  className={`min-h-[44px] rounded-full px-4 text-sm font-medium ${
                    q.status === "New"
                      ? "bg-[#107F94] text-[#FFFFFF]"
                      : "border border-[#003D40] bg-[#FFFFFF] text-[#000000]"
                  }`}
                >
                  {q.status}
                </button>
              </td>

              <td className="px-3 py-2">
                <button
                  onClick={() => setModal({ inquiry: q })}
                  className={ghostBtn}
                >
                  <Eye size={16} /> View
                </button>
              </td>
            </tr>
          ))}

          {list.length === 0 && (
            <tr>
              <td colSpan={5} className="px-3 py-8 text-center text-[#000000]/60">
                No inquiries yet. When a visitor sends the contact form on your
                website, it will appear here.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  const quick = [
    { label: "Add New Project", icon: Plus, action: openAddProject },
    { label: "Upload Photos", icon: ImagePlus, action: () => goTo("Gallery") },
    { label: "Edit Site Info", icon: Pencil, action: () => goTo("Settings") },
    { label: "View Inquiries", icon: Inbox, action: () => goTo("Inquiries") },
  ];

  /* ---------- Render ---------- */

  return (
    <div className="min-h-screen overflow-x-clip bg-[#FFFFFF] text-[#000000]">
      {/* Mobile / tablet top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-[#107F94]/30 bg-[#003D40] px-4 py-2 backdrop-blur lg:hidden">
        <button
          onClick={() => setDrawer(true)}
          aria-label="Open menu"
          className="flex h-11 w-11 items-center justify-center rounded-lg text-[#FFFFFF] transition hover:bg-[#107F94]"
        >
          <Menu size={24} />
        </button>

        <p className="font-serif text-base text-[#FFFFFF]">{view}</p>
        <span className="h-11 w-11" aria-hidden />
      </header>

      {/* Slide-out drawer */}
      <div className={`fixed inset-0 z-50 lg:hidden ${drawer ? "" : "pointer-events-none"}`}>
        <div
          onClick={() => setDrawer(false)}
          className={`absolute inset-0 bg-black/70 transition-opacity ${
            drawer ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          className={`absolute inset-y-0 left-0 w-72 max-w-[85vw] border-r border-[#107F94]/30 bg-[#003D40] transition-transform duration-300 ${
            drawer ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <button
            onClick={() => setDrawer(false)}
            aria-label="Close menu"
            className="absolute right-2 top-2 flex h-11 w-11 items-center justify-center rounded-lg text-[#FFFFFF] transition hover:bg-[#107F94]"
          >
            <X size={22} />
          </button>

          <SidebarContent
            active={view}
            newCount={newCount}
            onSelect={goTo}
            onLogout={logout}
          />
        </aside>
      </div>

      <div className="mx-auto flex w-full max-w-[1600px]">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen shrink-0 border-r border-[#107F94]/30 bg-[#003D40] lg:block lg:w-56 xl:w-64">
          <SidebarContent
            active={view}
            newCount={newCount}
            onSelect={goTo}
            onLogout={logout}
          />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-5 p-4 sm:p-5 lg:flex-row lg:gap-5 xl:gap-6 xl:p-8">
          <main className="min-w-0 flex-1 space-y-5 xl:space-y-6">
            <div>
              <h1 className="font-serif text-2xl text-[#000000] sm:text-3xl">
                {view === "Dashboard" ? "Welcome back, Taha" : view}
              </h1>

              {view === "Dashboard" && (
                <p className="mt-1 text-sm text-[#2F3035]">
                  Manage your projects, inquiries and site content.
                </p>
              )}
            </div>

            {/* Message banner */}
            {msg && (
              <div
                role="alert"
                className={`flex items-start justify-between gap-3 rounded-lg border p-3 text-sm ${
                  msg.type === "error"
                    ? "border-red-400/40 bg-red-50 text-red-700"
                    : "border-[#107F94]/40 bg-[#107F94]/10 text-[#003D40]"
                }`}
              >
                <p className="break-words">{msg.text}</p>
                <button
                  onClick={() => setMsg(null)}
                  aria-label="Dismiss"
                  className="shrink-0"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {/* DASHBOARD */}
            {view === "Dashboard" && (
              <>
                <section className={`${panel} p-4 xl:p-5`}>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h2 className="font-serif text-lg text-[#000000]">
                      Recent Projects
                    </h2>
                    <button onClick={openAddProject} className={ghostBtn}>
                      <Plus size={16} /> Add
                    </button>
                  </div>

                  {projectGrid(projects.slice(0, 6))}
                </section>

                <section className={`${panel} p-4 xl:p-5`}>
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <h2 className="font-serif text-lg text-[#000000]">
                      Recent Inquiries
                    </h2>
                    <button onClick={() => goTo("Inquiries")} className={ghostBtn}>
                      View all
                    </button>
                  </div>

                  {inquiryTable(inquiries.slice(0, 5))}
                </section>
              </>
            )}

            {/* PROJECTS */}
            {view === "Projects" && (
              <section className={`${panel} p-4 xl:p-5`}>
                <div className="mb-4 flex items-center justify-between gap-3">
                  <h2 className="font-serif text-lg text-[#000000]">
                    All Projects ({projects.length})
                  </h2>
                  <button onClick={openAddProject} className={goldBtn}>
                    <Plus size={16} /> Add Project
                  </button>
                </div>

                {projectGrid(projects)}
              </section>
            )}

            {/* INQUIRIES */}
            {view === "Inquiries" && (
              <section className={`${panel} p-4 xl:p-5`}>
                <h2 className="mb-4 font-serif text-lg text-[#000000]">
                  All Inquiries ({inquiries.length})
                </h2>

                {inquiryTable(inquiries)}
              </section>
            )}

            {/* GALLERY */}
            {view === "Gallery" && (
              <section className={`${panel} p-4 xl:p-5`}>
                <h2 className="mb-4 font-serif text-lg text-[#000000]">
                  Upload Photos
                </h2>

                <input
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={busy}
                  className={fileInput}
                  onChange={(e) => {
                    void uploadPhotos(e.target.files);
                    e.currentTarget.value = "";
                  }}
                />

                {busy && (
                  <p className="mt-3 text-sm text-[#107F94]">Uploading...</p>
                )}

                <div className="mt-4 grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-3">
                  {photos.map((ph) => (
                    <div key={ph.id} className="relative">
                      <img
                        src={ph.url}
                        alt="Gallery"
                        className="aspect-square w-full rounded-lg object-cover"
                      />

                      <button
                        onClick={() => deletePhoto(ph.id)}
                        aria-label="Delete photo"
                        className="absolute right-1 top-1 flex h-11 w-11 items-center justify-center rounded-lg bg-black/60 text-[#FFFFFF] hover:text-red-300"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                {photos.length === 0 && !busy && (
                  <p className="mt-4 text-sm text-[#2F3035]/60">
                    No photos uploaded yet.
                  </p>
                )}
              </section>
            )}

            {/* SETTINGS */}
            {view === "Settings" && (
              <section className={`${panel} max-w-xl space-y-3 p-4 xl:p-5`}>
                <h2 className="font-serif text-lg text-[#000000]">Site Info</h2>

                <label className="block text-sm text-[#000000]">
                  Site title
                  <input
                    className={`${input} mt-1`}
                    value={site.title}
                    onChange={(e) => setSite({ ...site, title: e.target.value })}
                  />
                </label>

                <label className="block text-sm text-[#000000]">
                  Phone
                  <input
                    className={`${input} mt-1`}
                    placeholder="+255 765 053 786"
                    value={site.phone}
                    onChange={(e) => setSite({ ...site, phone: e.target.value })}
                  />
                </label>

                <label className="block text-sm text-[#000000]">
                  Email
                  <input
                    className={`${input} mt-1`}
                    value={site.email}
                    onChange={(e) => setSite({ ...site, email: e.target.value })}
                  />
                </label>

                <label className="block text-sm text-[#000000]">
                  WhatsApp number (with country code)
                  <input
                    className={`${input} mt-1`}
                    placeholder="+255 765 053 786"
                    value={site.whatsapp}
                    onChange={(e) => setSite({ ...site, whatsapp: e.target.value })}
                  />
                </label>

                <label className="block text-sm text-[#000000]">
                  Instagram work (shown as an icon in the footer)
                  <input
                    className={`${input} mt-1`}
                    placeholder="https://instagram.com/yourworkpage"
                    value={site.instagram}
                    onChange={(e) =>
                      setSite({ ...site, instagram: e.target.value })
                    }
                  />
                </label>

                <label className="block text-sm text-[#000000]">
                  Instagram personal (shown as a link in About Me)
                  <input
                    className={`${input} mt-1`}
                    placeholder="https://instagram.com/yourpersonalpage"
                    value={site.instagramPersonal}
                    onChange={(e) =>
                      setSite({ ...site, instagramPersonal: e.target.value })
                    }
                  />
                </label>

                <label className="block text-sm text-[#000000]">
                  Location
                  <input
                    className={`${input} mt-1`}
                    placeholder="Ilala - Dar es Salaam"
                    value={site.location}
                    onChange={(e) => setSite({ ...site, location: e.target.value })}
                  />
                </label>

                <label className="block text-sm text-[#000000]">
                  Service line (shown in Contact)
                  <input
                    className={`${input} mt-1`}
                    placeholder="Metal Cutting | CNC Custom Designs & Industrial Solutions"
                    value={site.serviceLine}
                    onChange={(e) =>
                      setSite({ ...site, serviceLine: e.target.value })
                    }
                  />
                </label>

                <label className="block text-sm text-[#000000]">
                  Delivery note (shown in Contact)
                  <input
                    className={`${input} mt-1`}
                    placeholder="Tunasafirisha mikoa zote (We deliver to all regions)"
                    value={site.deliveryNote}
                    onChange={(e) =>
                      setSite({ ...site, deliveryNote: e.target.value })
                    }
                  />
                </label>

                <div className="pt-2">
                  <button
                    onClick={saveSite}
                    disabled={busy}
                    className={goldBtn}
                  >
                    {busy ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </section>
            )}
          </main>

          {/* Quick Actions */}
          {view === "Dashboard" && (
            <aside className="w-full shrink-0 lg:w-64 xl:w-72">
              <section className={`${panel} p-4 lg:sticky lg:top-5 xl:p-5`}>
                <h2 className="mb-4 font-serif text-lg text-[#000000]">
                  Quick Actions
                </h2>

                <div className="grid grid-cols-1 gap-3 min-[560px]:grid-cols-2 lg:grid-cols-1">
                  {quick.map(({ label, icon: Icon, action }) => (
                    <button
                      key={label}
                      onClick={action}
                      className={`${ghostBtn} justify-start`}
                    >
                      <Icon size={18} className="shrink-0" />
                      {label}
                    </button>
                  ))}
                </div>
              </section>
            </aside>
          )}
        </div>
      </div>

      {/* Add project modal */}
      {modal === "project" && (
        <Modal title="Add New Project" onClose={closeModal}>
          <div className="space-y-3">
            <input
              className={input}
              placeholder="Project title"
              value={draft.title}
              onChange={(e) => setDraft({ ...draft, title: e.target.value })}
            />

            <select
              className={input}
              value={draft.category}
              onChange={(e) => setDraft({ ...draft, category: e.target.value })}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <textarea
              className={`${input} min-h-[96px]`}
              placeholder="Description (optional)"
              maxLength={500}
              value={draft.description}
              onChange={(e) =>
                setDraft({ ...draft, description: e.target.value })
              }
            />

            <input
              type="file"
              accept="image/*"
              className={fileInput}
              onChange={(e) => pickFile(e.target.files?.[0])}
            />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="max-h-40 w-full rounded-lg object-cover"
              />
            )}

            {msg?.type === "error" && (
              <p className="text-sm text-red-600">{msg.text}</p>
            )}

            <div className="flex flex-col gap-2 pt-2 min-[425px]:flex-row min-[425px]:justify-end">
              <button onClick={closeModal} disabled={busy} className={ghostBtn}>
                Cancel
              </button>

              <button onClick={addProject} disabled={busy} className={goldBtn}>
                {busy ? "Uploading..." : "Save Project"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Inquiry details modal */}
      {modal && typeof modal === "object" && (
        <Modal title={modal.inquiry.name} onClose={closeModal}>
          <div className="space-y-2 text-sm text-[#000000]">
            <p className="text-[#2F3035]">{fmtDate(modal.inquiry.date)}</p>

            {modal.inquiry.service && (
              <p>
                <span className="font-semibold text-[#107F94]">Service:</span>{" "}
                {modal.inquiry.service}
              </p>
            )}

            {modal.inquiry.email && (
              <p className="break-words">
                <span className="font-semibold text-[#107F94]">Email:</span>{" "}
                <a className="underline" href={`mailto:${modal.inquiry.email}`}>
                  {modal.inquiry.email}
                </a>
              </p>
            )}

            {modal.inquiry.phone && (
              <p>
                <span className="font-semibold text-[#107F94]">Phone:</span>{" "}
                <a className="underline" href={`tel:${modal.inquiry.phone}`}>
                  {modal.inquiry.phone}
                </a>
              </p>
            )}

            <p className="break-words pt-2 leading-relaxed">
              {modal.inquiry.message}
            </p>
          </div>

          <div className="flex flex-col gap-2 pt-5 min-[425px]:flex-row min-[425px]:justify-end">
            <button
              onClick={() => deleteInquiry(modal.inquiry.id)}
              className={ghostBtn}
            >
              <Trash2 size={16} /> Delete
            </button>

            <button
              onClick={async () => {
                await toggleStatus(modal.inquiry);
                closeModal();
              }}
              className={goldBtn}
            >
              {modal.inquiry.status === "New"
                ? "Mark as Replied"
                : "Mark as New"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
