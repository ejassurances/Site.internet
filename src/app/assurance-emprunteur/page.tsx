import { PublicPage } from "@/components/public-page";
import { expertisePages } from "@/lib/content";

export default function AssuranceEmprunteurPage() {
  return <PublicPage {...expertisePages["/assurance-emprunteur"]} />;
}
