export default function Footer(){
    return(
        <footer className="bg-[#0E0E0E] w-full h-20 px-25 max-[1003px]:px-20 max-[939px]:px-15 max-[895px]:px-10 max-[510px]:px-5 max-[486px]:flex-wrap shadow-sm shadow-gray-400 flex items-center justify-between">
            <section>
                <img src="/assets/images/StreamBox.svg" width={64} alt="" />
            </section>
            <section className="text-text-color text-xs flex gap-x-5">
                <a href="">About</a>
                <a href="">Help</a>
                <a href="">Terms</a>
            </section>
            <section className="text-text-color text-xs flex">
                <p>&copy; 2024 StreamBox Inc. All rights reserved.</p>
            </section>
        </footer>
    )
}