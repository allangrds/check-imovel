import { ImageResponse } from "next/og";

export const alt = "Check Imóvel — checklist para comprar, manter e construir";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#f3f2f2",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#b68235",
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Check Imóvel
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            color: "#201f1d",
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          Checklist para comprar, manter e construir
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "#605d5d",
            marginTop: 32,
            maxWidth: 900,
          }}
        >
          Compra, manutenção e construção de casa em um só lugar.
        </div>
      </div>
    ),
    { ...size }
  );
}
