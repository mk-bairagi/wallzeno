import { API_BASE_URL } from "@/lib/config";

type Wallpaper = {
  id: string;
  title: string;
  slug: string;
  thumb_url: string;
  is_premium: boolean;
};

type WallpapersResponse = {
  items: Wallpaper[];
  total: number;
};

async function getWallpapers(): Promise<WallpapersResponse> {
  const res = await fetch(`${API_BASE_URL}/wallpapers`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch wallpapers");
  }

  return res.json();
}

export default async function HomePage() {
  const data = await getWallpapers();

  return (
    <main className="min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Wallzeno</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.items.map((w) => (
          <div
            key={w.id}
            className="border rounded-xl overflow-hidden shadow-sm"
          >
            <img
              src={w.thumb_url}
              alt={w.title}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <div className="font-semibold">{w.title}</div>

              {w.is_premium && (
                <div className="text-xs text-red-500 mt-1">
                  Premium
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}