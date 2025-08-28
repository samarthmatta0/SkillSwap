import svgPaths from "./svg-loob4bis1h";
import imgRectangle from "figma:asset/e887b2712cade5c5401477c2b85dbaf2fec3fff5.png";
import imgImage6 from "figma:asset/3b7d4fa9f986b38bb5f7803a14f4c23bb127ebe3.png";
import imgImage8 from "figma:asset/b74935ff009b75f96a0c04bbbcfb0520475d2fbd.png";
import { imgImage7, imgImage9 } from "./svg-1fmue";

function Bg() {
  return (
    <div className="absolute contents left-0 top-0" data-name="BG">
      <div className="absolute bg-[#000000] h-[906px] left-0 top-0 w-[1600px]" data-name="BG" />
      <div className="absolute flex h-[560.778px] items-center justify-center left-[812px] top-[202px] w-[628.727px]">
        <div className="flex-none rotate-[247.852deg]">
          <div className="h-[518.247px] relative w-[394.526px]">
            <div className="absolute inset-[-40.52%_-53.23%]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 815 939">
                <g filter="url(#filter0_f_5049_333)" id="Ellipse 33">
                  <path d={svgPaths.p27d50b32} fill="url(#paint0_linear_5049_333)" />
                </g>
                <defs>
                  <filter colorInterpolationFilters="sRGB" filterUnits="userSpaceOnUse" height="938.247" id="filter0_f_5049_333" width="814.526" x="0" y="1.16666e-05">
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape" />
                    <feGaussianBlur result="effect1_foregroundBlur_5049_333" stdDeviation="105" />
                  </filter>
                  <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_5049_333" x1="210" x2="656.214" y1="210" y2="259.169">
                    <stop stopColor="#6DDCFF" />
                    <stop offset="1" stopColor="#7F60F9" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-repeat bg-size-[220px_220px] bg-top-left h-[906px] left-0 mix-blend-overlay opacity-[0.22] top-0 w-[1600px]" data-name="Rectangle" style={{ backgroundImage: `url('${imgRectangle}')` }} />
    </div>
  );
}

function Image() {
  return (
    <div className="absolute contents left-[898px] top-[173px]" data-name="Image">
      <div className="absolute h-[215.498px] left-[898.93px] rounded-[145px] top-[267.75px] w-[220.142px]" data-name="Image Placeholder" />
      <div className="absolute flex h-[253.733px] items-center justify-center left-[818.43px] top-[237.13px] w-[382.144px]">
        <div className="flex-none rotate-[0.261deg]">
          <div className="bg-center bg-cover bg-no-repeat h-[252px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[79.572px_-64.134px] mask-size-[222px_311.172px] w-[381px]" data-name="image 6" style={{ backgroundImage: `url('${imgImage6}')`, maskImage: `url('${imgImage7}')` }} />
        </div>
      </div>
      <div className="absolute flex h-[253.733px] items-center justify-center left-[818.43px] mix-blend-color-burn top-[237.13px] w-[382.144px]">
        <div className="flex-none rotate-[0.261deg]">
          <div className="bg-center bg-cover bg-no-repeat h-[252px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[79.572px_-64.134px] mask-size-[222px_311.172px] opacity-[0.15] w-[381px]" data-name="image 7" style={{ backgroundImage: `url('${imgImage6}')`, maskImage: `url('${imgImage7}')` }} />
        </div>
      </div>
    </div>
  );
}

function Component1() {
  return (
    <div className="absolute contents left-[898px] top-[173px]" data-name="1">
      <Image />
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute contents leading-[0] left-[915px] not-italic text-nowrap top-[173px]">
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] justify-center left-[915px] text-[#ffffff] text-[18px] top-[188px] translate-y-[-50%]">
        <p className="leading-[30px] text-nowrap whitespace-pre">Guy Hawkins</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center left-[915px] text-[14px] text-zinc-400 top-[217px] translate-y-[-50%]">
        <p className="leading-[22px] text-nowrap whitespace-pre">Software Engineer</p>
      </div>
    </div>
  );
}

function Group7() {
  return (
    <div className="absolute contents leading-[0] left-[1167px] not-italic text-nowrap top-[719px]">
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] justify-center left-[1167px] text-[#ffffff] text-[18px] top-[734px] translate-y-[-50%]">
        <p className="leading-[30px] text-nowrap whitespace-pre">Leslie Alexander</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center left-[1167px] text-[14px] text-zinc-400 top-[763px] translate-y-[-50%]">
        <p className="leading-[22px] text-nowrap whitespace-pre">HR Manager, Groove</p>
      </div>
    </div>
  );
}

function Component3() {
  return (
    <div className="absolute contents left-[898px] top-[173px]" data-name="1">
      <Component1 />
      <Group6 />
      <Group7 />
    </div>
  );
}

function Image1() {
  return (
    <div className="absolute contents left-[1129px] top-[453px]" data-name="Image">
      <div className="absolute left-[1129px] rounded-[185px] size-[213px] top-[491.65px]" data-name="Image Placeholder" />
      <div className="absolute bg-[45.52%_50%] bg-no-repeat bg-size-[189.51%_100.33%] h-[249px] left-[1093px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[36px_-9px] mask-size-[213px_251.646px] top-[462px] w-[264px]" data-name="image 7" style={{ backgroundImage: `url('${imgImage8}')`, maskImage: `url('${imgImage9}')` }} />
    </div>
  );
}

function Component2() {
  return (
    <div className="absolute contents left-[1129px] top-[453px]" data-name="2">
      <Image1 />
    </div>
  );
}

function Component4() {
  return (
    <div className="absolute contents left-[1129px] top-[453px]" data-name="2">
      <Component2 />
    </div>
  );
}

function Image2() {
  return (
    <div className="absolute contents left-[898px] top-[173px]" data-name="Image">
      <div className="absolute flex h-[451.189px] items-center justify-center left-[898.5px] top-[264.5px] w-[451.189px]">
        <div className="flex-none rotate-[315deg]">
          <div className="h-[483.94px] relative rounded-[240px] w-[154.149px]">
            <div aria-hidden="true" className="absolute border-[#6ddcff] border-[7px] border-solid inset-0 pointer-events-none rounded-[240px]" />
          </div>
        </div>
      </div>
      <Component3 />
      <Component4 />
    </div>
  );
}

function IconOutlineSearch() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon/Outline/search">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon/Outline/search">
          <path d={svgPaths.p2e3c1d00} id="Icon" stroke="var(--stroke-0, #71717A)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Icon() {
  return (
    <div className="content-stretch flex gap-2.5 items-center justify-center relative shrink-0 size-[18px]" data-name="Icon">
      <IconOutlineSearch />
    </div>
  );
}

function Frame2() {
  return (
    <div className="basis-0 grow min-h-px min-w-px relative rounded-[60px] shrink-0 w-full">
      <div className="flex flex-row items-center overflow-clip relative size-full">
        <div className="box-border content-stretch flex gap-[13px] items-center justify-start px-4 py-[17px] relative size-full">
          <Icon />
          <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap text-zinc-500">
            <p className="leading-[22px] whitespace-pre">Try Java Developer, React Dev etc.</p>
          </div>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#6ddcff] border-solid inset-0 pointer-events-none rounded-[60px]" />
    </div>
  );
}

function InputTextStyle1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-2.5 h-16 items-start justify-center left-[155px] top-[562px] w-[511px]" data-name="Input/Text Style 1">
      <Frame2 />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex gap-[9px] items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['IBM_Plex_Sans:SemiBold',_sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[14px] text-nowrap text-right text-zinc-900 uppercase">
        <p className="leading-[22px] whitespace-pre">Find A Developer</p>
      </div>
    </div>
  );
}

function ButtonPrimaryWithIcon() {
  return (
    <div className="absolute bg-[#ffffff] box-border content-stretch flex flex-col gap-2.5 h-[50px] items-center justify-center left-[488px] p-[16px] rounded-[60px] top-[569px] w-[171px]" data-name="Button/Primary/With Icon">
      <Frame1 />
    </div>
  );
}

function Form() {
  return (
    <div className="absolute contents left-[155px] top-[562px]" data-name="Form">
      <InputTextStyle1 />
      <ButtonPrimaryWithIcon />
    </div>
  );
}

function IconSolidStar() {
  return (
    <div className="absolute left-[152px] size-[21.454px] top-[712px]" data-name="Icon/Solid/star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon/Solid/star">
          <path d={svgPaths.p2921ed00} fill="url(#paint0_linear_5049_330)" id="Icon" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_5049_330" x1="2.75176" x2="20.6039" y1="3.47142" y2="6.1696">
            <stop stopColor="#6DDCFF" />
            <stop offset="1" stopColor="#7F60F9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function IconSolidStar1() {
  return (
    <div className="absolute left-[174.46px] size-[21.454px] top-[712px]" data-name="Icon/Solid/star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon/Solid/star">
          <path d={svgPaths.p2921ed00} fill="url(#paint0_linear_5049_330)" id="Icon" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_5049_330" x1="2.75176" x2="20.6039" y1="3.47142" y2="6.1696">
            <stop stopColor="#6DDCFF" />
            <stop offset="1" stopColor="#7F60F9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function IconSolidStar2() {
  return (
    <div className="absolute left-[196.91px] size-[21.454px] top-[712px]" data-name="Icon/Solid/star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon/Solid/star">
          <path d={svgPaths.p2921ed00} fill="url(#paint0_linear_5049_330)" id="Icon" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_5049_330" x1="2.75176" x2="20.6039" y1="3.47142" y2="6.1696">
            <stop stopColor="#6DDCFF" />
            <stop offset="1" stopColor="#7F60F9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function IconSolidStar3() {
  return (
    <div className="absolute left-[219.36px] size-[21.454px] top-[712px]" data-name="Icon/Solid/star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon/Solid/star">
          <path d={svgPaths.p2921ed00} fill="url(#paint0_linear_5049_330)" id="Icon" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_5049_330" x1="2.75176" x2="20.6039" y1="3.47142" y2="6.1696">
            <stop stopColor="#6DDCFF" />
            <stop offset="1" stopColor="#7F60F9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function IconSolidStar4() {
  return (
    <div className="absolute left-[241.82px] size-[21.454px] top-[712px]" data-name="Icon/Solid/star">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 22">
        <g id="Icon/Solid/star">
          <path d={svgPaths.p2921ed00} fill="url(#paint0_linear_5049_330)" id="Icon" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_5049_330" x1="2.75176" x2="20.6039" y1="3.47142" y2="6.1696">
            <stop stopColor="#6DDCFF" />
            <stop offset="1" stopColor="#7F60F9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function Star() {
  return (
    <div className="absolute contents left-[152px] top-[712px]" data-name="Star">
      <IconSolidStar />
      <IconSolidStar1 />
      <IconSolidStar2 />
      <IconSolidStar3 />
      <IconSolidStar4 />
    </div>
  );
}

function Reviews() {
  return (
    <div className="absolute contents left-[152px] top-[672px]" data-name="Reviews">
      <Star />
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] justify-center leading-[0] left-[152px] not-italic text-[#ffffff] text-[18px] text-nowrap top-[687px] translate-y-[-50%]">
        <p className="leading-[30px] whitespace-pre">Trusted by 50k+ users</p>
      </div>
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] justify-center leading-[0] left-[314px] not-italic text-[16px] text-nowrap text-zinc-500 top-[724px] translate-y-[-50%]">
        <p className="leading-[24px] whitespace-pre">(14k Reviews)</p>
      </div>
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] justify-center leading-[0] left-[270px] not-italic text-[#ffffff] text-[16px] text-nowrap top-[724px] translate-y-[-50%]">
        <p className="leading-[24px] whitespace-pre">4.1/5</p>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="absolute contents left-[152px] top-[217px]" data-name="Content">
      <div className="absolute flex flex-col font-['IBM_Plex_Sans:Regular',_sans-serif] justify-center leading-[0] left-[152px] not-italic text-[#ffffff] text-[80px] top-[307px] translate-y-[-50%] w-[650px]">
        <p className="leading-[90px]">Connecting Devs with Employers</p>
      </div>
      <div className="absolute flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] left-[155px] not-italic text-[18px] text-zinc-400 top-[474px] translate-y-[-50%] w-[511px]">
        <p className="leading-[28px]">Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat.</p>
      </div>
      <Form />
      <Reviews />
    </div>
  );
}

function Menu() {
  return (
    <div className="absolute contents leading-[0] left-[378px] text-[#ffffff] text-[16px] text-nowrap top-[42px]" data-name="Menu">
      <div className="absolute font-['Plus_Jakarta_Sans:Medium',_sans-serif] font-medium left-[378px] top-[42px]">
        <p className="leading-[24px] text-nowrap whitespace-pre">Products</p>
      </div>
      <div className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] left-[509px] not-italic top-[42px]">
        <p className="leading-[24px] text-nowrap whitespace-pre">Features</p>
      </div>
      <div className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] left-[632px] not-italic top-[42px]">
        <p className="leading-[24px] text-nowrap whitespace-pre">Pricing</p>
      </div>
      <div className="absolute font-['IBM_Plex_Sans:Regular',_sans-serif] left-[742px] not-italic top-[42px]">
        <p className="leading-[24px] text-nowrap whitespace-pre">Support</p>
      </div>
    </div>
  );
}

function LogoOriginal() {
  return (
    <div className="absolute h-[37px] left-[152px] top-[35px] w-[134px]" data-name="Logo/Original">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 134 37">
        <g clipPath="url(#clip0_5049_316)" id="Logo/Original">
          <path d={svgPaths.p1fe96680} fill="url(#paint0_linear_5049_316)" id="Vector" />
          <path d={svgPaths.p15f48f0} fill="var(--fill-0, white)" id="Vector_2" />
          <path d={svgPaths.p226aca00} fill="var(--fill-0, white)" id="Vector_3" />
          <path d={svgPaths.p1983c100} fill="var(--fill-0, white)" id="Vector_4" />
          <path d={svgPaths.p2f7e3e80} fill="var(--fill-0, white)" id="Vector_5" />
          <path d={svgPaths.p2b2c9c00} fill="var(--fill-0, white)" id="Vector_6" />
          <path d={svgPaths.p1a724830} fill="var(--fill-0, white)" id="Vector_7" />
          <path d={svgPaths.p19bafe80} fill="var(--fill-0, white)" id="Vector_8" />
          <path d={svgPaths.p2b306700} fill="var(--fill-0, white)" id="Vector_9" />
          <path d={svgPaths.p8b1aa00} fill="var(--fill-0, white)" id="Vector_10" />
        </g>
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="paint0_linear_5049_316" x1="-8.03511e-07" x2="41.482" y1="0" y2="6.0322">
            <stop stopColor="#6DDCFF" />
            <stop offset="1" stopColor="#7F60F9" />
          </linearGradient>
          <clipPath id="clip0_5049_316">
            <rect fill="white" height="37" width="134" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex gap-[9px] items-center justify-center relative shrink-0">
      <div className="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#ffffff] text-[16px] text-nowrap text-right">
        <p className="leading-[26px] whitespace-pre">Start free trial</p>
      </div>
    </div>
  );
}

function ButtonPrimaryWithIcon1() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-2.5 h-[50px] items-center justify-center left-[1293px] p-[16px] rounded-[60px] top-[29px] w-[155px]" data-name="Button/Primary/With Icon">
      <div aria-hidden="true" className="absolute border border-[#6ddcff] border-solid inset-0 pointer-events-none rounded-[60px]" />
      <Frame3 />
    </div>
  );
}

function Header() {
  return (
    <div className="absolute contents left-[152px] top-[29px]" data-name="Header">
      <Menu />
      <LogoOriginal />
      <ButtonPrimaryWithIcon1 />
    </div>
  );
}

export default function Hero() {
  return (
    <div className="relative size-full" data-name="Hero">
      <Bg />
      <Image2 />
      <Content />
      <Header />
    </div>
  );
}