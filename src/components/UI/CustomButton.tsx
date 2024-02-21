"use client";
import styles from "./CustomButton.module.css";
export default function CustomButton({
  variant = "primary",
  children,
  ...props
}: {
  variant?: "primary" | "secondary";
  children: string;
  [x: string]: any;
}) {
  return (
    <button className={styles[variant]} {...props}>
      {children}
    </button>
  );
}
