import { ImageResponse } from "next/og";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "64px",
                    background: "#000000",
                    color: "white",
                }}
            >
                <div style={{ fontSize: 28, opacity: 0.8, letterSpacing: 2 }}>SHAMISO MUSIC DISTRIBUTION</div>
                <div style={{ fontSize: 70, fontWeight: 900, lineHeight: 1.1, marginTop: 18 }}>
                    The Sovereign Distributor
                </div>
                <div style={{ fontSize: 30, opacity: 0.85, marginTop: 24 }}>
                    Music distribution, growth, and funding infrastructure for Africa.
                </div>
            </div>
        ),
        {
            ...size,
        }
    );
}
