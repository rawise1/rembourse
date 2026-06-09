// // Importing assets lets Vite bundle + fingerprint them and hand back valid URLs.
// import logo from '../assets/logo.svg'
// import brandImage from '../assets/BrandImage.png'

// /**
//  * BrandPanel — the left half of the split.
//  *
//  * A centered vertical stack: logo → heading → image, on a flat pure-black
//  * surface (no gradient or texture). Hidden below the `lg` breakpoint where the
//  * layout collapses to a single column.
//  */
// export default function BrandPanel() {
//   return (
//     <section className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center gap-6 px-12 py-10 text-center">
//       <div className='flex flex-row items-start self-start'>
//         <img src={logo} alt="Kolak" className="h-20" />
//       </div>

//       {/* Poppins, medium weight (not bold), forced onto two lines. Line two is
//           a left→right gradient via bg-clip-text. */}
//       <h1 className="font-poppins text-[36px] leading-[44px] font-medium tracking-[0.01em] flex flex-col gap-4">
//         <span className="block">See everyday moments from your</span>
//         <span className="block bg-gradient-to-r from-[#0095F6] to-[#9360F7] bg-clip-text text-transparent">
//           close friends
//         </span>
//       </h1>
//       {/* Transparent PNG sitting directly on the black panel — no frame/bg. */}
//       <img src={brandImage} alt="" className="w-full max-w-[450px] object-contain" />
//     </section>
//   )




// }


import logo from '../assets/logo.svg'
import brandImage from '../assets/BrandImage.png'

export default function BrandPanel() {
  return (
    <section className="flex flex-col items-center justify-center bg-black text-white w-full px-6 py-10">

      {/* Logo always visible */}
      <div className="flex w-full justify-center lg:justify-start">
        <img src={logo} alt="Kolak" className="h-14 lg:h-20" />
      </div>

      {/* TEXT ONLY DESKTOP */}
      <div className="hidden lg:flex flex-col items-center text-center gap-4 mt-6">
        <h1 className="font-poppins text-[36px] leading-[44px] font-medium tracking-[0.01em] flex flex-col gap-4">
          <span>See everyday moments from your</span>
          <span className="bg-gradient-to-r from-[#0095F6] to-[#9360F7] bg-clip-text text-transparent">
            close friends
          </span>
        </h1>
      </div>

      {/* IMAGE ONLY DESKTOP */}
      <img
        src={brandImage}
        alt=""
        className="hidden lg:block w-full max-w-[450px] object-contain mt-6"
      />
    </section>
  )
}