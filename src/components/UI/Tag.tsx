import styles from "./Tag.module.css";

interface TagProps {
  children: React.ReactNode;
  color?: string;
}

function getRandomTagColor() {
  const availableSchemas = [
    "primaryColorTag",
    "orangeColorTag",
    "secondaryColorTag",
    "tertiaryColorTag",
  ];
  return availableSchemas[Math.floor(Math.random() * availableSchemas.length)];
}

export default function Tag({ children, color }: TagProps) {
  return <div className={styles[getRandomTagColor()]}>{children}</div>;
}
