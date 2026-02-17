"use client";

/**
 * CorridorMap — SSA–UK–Global corridor visualization
 * Uses the user-provided world.svg (simplemaps, viewBox 0 0 2000 857)
 * City positions are manually calibrated from the SVG country outlines.
 */

const CITIES = [
    { name: "London", x: 988, y: 168, label: "UK HQ", stat: "FCA Regulated", anchor: "end" as const },
    { name: "Lagos", x: 1043, y: 453, label: "West Africa", stat: "Paystack Payouts", anchor: "start" as const },
    { name: "Johannesburg", x: 1145, y: 660, label: "Southern Africa", stat: "ZAR On-Ramp", anchor: "start" as const },
    { name: "Accra", x: 999, y: 460, label: "Ghana", stat: "MoMo Enabled", anchor: "end" as const },
    { name: "Nairobi", x: 1205, y: 438, label: "East Africa", stat: "M-Pesa Ready", anchor: "start" as const },
    { name: "New York", x: 585, y: 258, label: "USA", stat: "30% Tax Saving", anchor: "end" as const },
];

const CONNECTIONS = [
    { from: "London", to: "Lagos" },
    { from: "London", to: "Johannesburg" },
    { from: "London", to: "Accra" },
    { from: "London", to: "Nairobi" },
    { from: "London", to: "New York" },
    { from: "Lagos", to: "Accra" },
    { from: "Nairobi", to: "Johannesburg" },
];

export function CorridorMap() {
    const cityPositions = CITIES;

    const getCity = (name: string) => cityPositions.find((c) => c.name === name)!;

    return (
        <section id="corridor" className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-black to-[#060500]" />

            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-shamiso-gold-bright">
                        The Corridor
                    </p>
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        SSA → UK → <span className="gradient-text">Global</span>
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
                        Purpose-built infrastructure connecting Sub-Saharan Africa to
                        the world&apos;s biggest music markets.
                    </p>
                </div>

                {/* Map container */}
                <div className="relative mx-auto max-w-5xl">
                    {/* SVG overlay with real map background */}
                    <svg
                        viewBox="0 0 2000 857"
                        className="w-full h-auto"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Embed the real world map as a background image */}
                        <defs>
                            <filter id="gold-tint">
                                <feColorMatrix
                                    type="matrix"
                                    values="0.3 0 0 0 0.06
                          0.25 0 0 0 0.04
                          0 0 0 0 0
                          0 0 0 0.25 0"
                                />
                            </filter>
                        </defs>

                        <image
                            href="/world.svg"
                            x="0"
                            y="0"
                            width="2000"
                            height="857"
                            filter="url(#gold-tint)"
                        />

                        {/* Connection lines */}
                        {CONNECTIONS.map((conn) => {
                            const from = getCity(conn.from);
                            const to = getCity(conn.to);
                            const midX = (from.x + to.x) / 2;
                            const midY = Math.min(from.y, to.y) - 60;
                            return (
                                <g key={`${conn.from}-${conn.to}`}>
                                    {/* Glow line */}
                                    <path
                                        d={`M${from.x},${from.y} Q${midX},${midY} ${to.x},${to.y}`}
                                        fill="none"
                                        stroke="rgba(255,215,0,0.1)"
                                        strokeWidth="6"
                                    />
                                    {/* Main line */}
                                    <path
                                        d={`M${from.x},${from.y} Q${midX},${midY} ${to.x},${to.y}`}
                                        fill="none"
                                        stroke="rgba(255,215,0,0.5)"
                                        strokeWidth="2"
                                        strokeDasharray="12 8"
                                    >
                                        <animate
                                            attributeName="stroke-dashoffset"
                                            from="0"
                                            to="-40"
                                            dur="2s"
                                            repeatCount="indefinite"
                                        />
                                    </path>
                                </g>
                            );
                        })}

                        {/* City dots */}
                        {cityPositions.map((city) => (
                            <g key={city.name}>
                                {/* Outer pulse ring */}
                                <circle cx={city.x} cy={city.y} r="16" fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="1">
                                    <animate attributeName="r" values="8;24;8" dur="3s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" values="0.6;0;0.6" dur="3s" repeatCount="indefinite" />
                                </circle>
                                {/* Glow */}
                                <circle cx={city.x} cy={city.y} r="12" fill="rgba(255,215,0,0.15)" />
                                {/* Dot */}
                                <circle cx={city.x} cy={city.y} r="6" fill="#FFD700" />

                                {/* Label */}
                                <text
                                    x={city.anchor === "end" ? city.x - 18 : city.x + 18}
                                    y={city.y - 16}
                                    textAnchor={city.anchor}
                                    fill="white"
                                    fontSize="18"
                                    fontWeight="700"
                                    fontFamily="system-ui, sans-serif"
                                >
                                    {city.name}
                                </text>
                                <text
                                    x={city.anchor === "end" ? city.x - 18 : city.x + 18}
                                    y={city.y + 6}
                                    textAnchor={city.anchor}
                                    fill="rgba(255,215,0,0.75)"
                                    fontSize="14"
                                    fontFamily="system-ui, sans-serif"
                                >
                                    {city.stat}
                                </text>
                            </g>
                        ))}
                    </svg>

                    {/* Stat cards */}
                    <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                        {cityPositions.map((city) => (
                            <div
                                key={city.name}
                                className="glass-card rounded-lg border border-shamiso-gold/10 p-3 text-center"
                            >
                                <p className="text-xs font-bold text-shamiso-gold-bright">{city.name}</p>
                                <p className="text-[10px] text-muted-foreground">{city.label}</p>
                                <p className="mt-1 text-[10px] font-medium text-white">{city.stat}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
