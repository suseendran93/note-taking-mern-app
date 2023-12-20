export const Footer = () => {
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: "rgba(33,37,41,1)",
        color: "rgba(255, 255, 255, 0.55)",
      }}
    >
      &copy; {new Date().getFullYear()} Copyright: Noteyfy
    </footer>
  );
};
