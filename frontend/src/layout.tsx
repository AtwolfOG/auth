
export default function Layout(){
    return(
        <>
        <div className="bg-linear-to-br from-green-900  via-green-600 to-emerald-800 w-screen h-screen absolute -z-10">
            <div className="w-[100px] h-[100px] bg-green-500 blur-sm rounded-full absolute top-[100px]  layout-animation"></div>
            <div
             className="w-[100px] h-[100px] bg-green-500 blur-sm rounded-full absolute right-[350px]  layout-animation2"></div>
        </div>
        </>
    )
}
