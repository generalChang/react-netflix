import { useEffect } from "react";

export default function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) {
        // 누른곳이 모달에 포함되어 있으면
        // 모달창이 닫히면 안됨.
        return;
      }
      handler(); // <- 모달창을 닫는 콜백메서드임.
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", () => {});
      document.removeEventListener("touchstart", () => {});
    };
  }, []);
}
