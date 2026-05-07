import Terminal from "@/components/Terminal";
import me from "@/constants/me";

export default function Home() {
  return (
    <>
      <div className="sr-only">
        <h1>
          {me.firstName} {me.lastName} — {me.title}
        </h1>
        <p>
          {me.firstName} {me.lastName} is a {me.title} based in Istanbul,
          Turkey. Currently working at {me.experiences[0].company}. Specializes
          in {me.skills.slice(0, 8).join(", ")} and more.
        </p>
        <p>
          Explore {me.firstName}&apos;s interactive terminal portfolio at
          gokhangunduz.dev — type commands to discover skills, work experience,
          open source projects, and contact information.
        </p>
      </div>
      <Terminal />
    </>
  );
}
