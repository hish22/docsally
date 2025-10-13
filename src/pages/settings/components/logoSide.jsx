import logo from "./../../../assets/icons/app/logo.png";

export default function LogoSide() {
    return (
        <div className="flex items-center">
            <img src={logo} width={50} id="logo-in-settings" />
            <p className=" text-2xl">Docsally</p>
        </div>
    )
}