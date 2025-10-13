import leftArrow from './../../../assets/icons/app/left-arrow.png';

export default function ReturnButton({setOpenSettings}) {

    return (
        <div className='flex items-center bg-neutral-800 p-2 cursor-pointer' id='return-box' onClick={() => setOpenSettings(false)}> 
            <img src={leftArrow} width={40}/>
            <p className='p-2'>Settings</p>
        </div>
    )
}