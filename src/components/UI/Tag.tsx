import styles from "./Tag.module.css";

interface TagProps {
  children: React.ReactNode;
  variant: "primary" | "orange" | "secondary" | "tertiary";
}

export default function Tag({ children, variant = "primary" }: TagProps) {
  const variants = {
    primary: "primaryColorTag",
    orange: "orangeColorTag",
    secondary: "secondaryColorTag",
    tertiary: "tertiaryColorTag",
  };

  return <div className={styles[variants[variant]]}>{children}</div>;
}
