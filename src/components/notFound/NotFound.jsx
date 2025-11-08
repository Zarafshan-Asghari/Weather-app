import errIcon from '../../../public/assets/images/icon-error.svg'
import retryIcon from '../../../public/assets/images/icon-retry.svg'

export default function NotFound(){
     const handleReload = () => {
    window.location.reload();
  };
    return (
        <div className="flex items-center flex-col bg-neutral-800 h-screen gap-1.5 py-20">
            <img src={errIcon} alt="err icon" className='size-6' />
            <h5 className='font-bold xl:text-5xl md:text-3xl text-xl text-neutral-100 '>Somthing went wrong!</h5>
            <p className='text-neutral-400 font-thin'>please try again </p>
            <button onClick={handleReload} className='bg-neutral-950/80 flex gap-1 items-center p-2 cursor-pointer rounded-md text-neutral-400'>
                <img src={retryIcon} alt="" />
                Retry</button>
        </div>
    )
}