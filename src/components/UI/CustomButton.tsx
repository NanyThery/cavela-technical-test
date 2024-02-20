"use client";
import styles from "./CustomButton.module.css";
export default function CustomButton({
  onClick,
  variant = "primary",
  children,
}: {
  onClick: () => void;
  variant?: "primary" | "secondary";
  children: string;
}) {
  return (
    <button className={styles[variant]} onClick={onClick}>
      {children}
    </button>
  );
}
