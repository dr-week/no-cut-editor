import { createFileRoute } from "@tanstack/react-router";
import { OpenCutEditor } from "#/components/OpenCutEditor";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return <OpenCutEditor />;
}
