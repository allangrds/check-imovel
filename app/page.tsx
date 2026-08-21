import { Checklist } from "@/components/Checklist";
import { sections } from "@/lib/checklist-data";

export default function Home() {
  return <Checklist sections={sections} />;
}
