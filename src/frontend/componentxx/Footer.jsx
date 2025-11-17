export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 w-full text-white bg-gradient-to-r from-[#0a3d62]/90 via-[#0c4a7c]/90 to-[#0a3d62]/80 backdrop-blur-md py-2 shadow-[0_-4px_10px_rgba(0,0,0,0.2)] border-t border-gray-200">
            <div className="max-w-6xl mx-auto px-4 flex flex-col items-center justify-center text-center">

                <p className="text-sm font-medium">
                    &copy; {new Date().getFullYear()} Powered By IT Teams PT Markindo Rekateknik Demo Apps
                </p>

            </div>
        </footer>
    );
}
// export default function Footer() {
//     return (
//         <footer
//             className="
//             fixed buttom-0 left-0 w-full
//             bg-gradient-to-b from-[#0a3d62]/85 via-[#0c4a7c]/85 to-[#07345a]/90
//             backdrop-blur-xl
           
//             relative overflow-hidden
//             transition-all duration-500
//         "
//         >
//             {/* Refleksi Aero */}
//             {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/20 to-transparent opacity-60 mix-blend-screen" /> */}

//             {/* Glow Pinggir Aero (tanpa shadow) */}
//             {/* <div className="pointer-events-none absolute inset-0 border-t border-blue-200/40" /> */}

//             <div className="bottom-0 max-w-6xl mx-auto px-4 py-2 flex flex-col items-center justify-center text-center">
//                 <p className="text-sm font-medium text-[#d9e9ff] drop-shadow-sm">
//                     &copy; {new Date().getFullYear()} Powered By IT Teams PT Markindo Rekateknik Demo Apps
//                 </p>
//             </div>
//         </footer>
//     );
// }
