import Navbar from "@/components/Navbar";
import PageTracker from "@/components/PageTracker";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <PageTracker />
            <Navbar />
            <main>
                {children}
            </main>
        </>
    );
}

