export const Error = ({ error }) => {
    return (
        <div style={{ color: "#8B0000", textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>
            <h1>Lo sentimos, ocurrió un error 😢</h1>
            <p>{error}</p>
        </div>
    )
}