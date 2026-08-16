import { createFileRoute } from "@tanstack/react-router";
import { NocutEditor } from "#/components/OpenCutEditor";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return <NocutEditor />;
}
