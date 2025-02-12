import ContentAnimation from '@/components/layouts/content-animation';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* <div className="relative bg-cover bg-no-repeat bg-center w-full h-full bg-[url('https://images.unsplash.com/photo-1560263492-df02cac7762c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdyaWR8ZW58MHx8MHx8fDA%3D')]"> */}
            <div className="relative">
                <ContentAnimation>{children}</ContentAnimation>
            </div>
        </>
    );
}
