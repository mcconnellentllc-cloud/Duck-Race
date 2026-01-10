export default function Footer() {
  return (
    <footer className="bg-wrangler-800 text-wrangler-100 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-3 text-white">Toyne-Britton Memorial Scholarship</h3>
            <p className="text-sm text-wrangler-200">
              Honoring two men who dedicated their lives to family, farming, and serving their communities.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3 text-white">The Duck Race</h3>
            <p className="text-sm text-wrangler-200">
              Four races, four winners. Every duck supports the scholarship fund.
              First duck down the river wins.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-3 text-white">Sedgwick County, Colorado</h3>
            <p className="text-sm text-wrangler-200">
              A community coming together to honor two of its finest,
              helping the next generation find their path.
            </p>
          </div>
        </div>

        <div className="border-t border-wrangler-700 mt-8 pt-6 text-center">
          <p className="text-sm text-wrangler-300">
            In loving memory of Jason Toyne (1982-2025) and Cameron Britton (1987-2024)
          </p>
          <p className="text-xs text-carhartt-400 mt-2 italic">
            "Strength and courage to face the world."
          </p>
        </div>
      </div>
    </footer>
  );
}
