import { ImCancelCircle } from "react-icons/im"
 
const Modal = ({ heading = "",headColor="", zindex = "z-[100000000]", showHeader = true, cstmClass, showFooter = true, size, header, cstmsize = "", showIndexForm = false, visible, innerContent, buttons = [], setVisible, showFooterArea }) => {
 
    const sizes = {
        "sm": "h-[36vh] w-[42vw]",
        "md": "h-[48vh] w-[52vw]",
        "lg": "h-[62vh] w-[68vw]",
        "xl": "h-[78vh] w-[82vw]",
        "2xl": "h-[92vh] w-[96vw]",
        "cstm": cstmsize + ' max-w-[85vw]'
    }
    return <>
        {
            visible && <div class={`relative ${zindex}`} aria-labelledby="modal-title" role="dialog" aria-modal="true">
 
                <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true">
                    {/* dsadsadadasdsadsadsa */}
                </div>
 
                <div class="fixed inset-0 z-1000 w-screen overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
 
                        <div class={`relative ${sizes[size]} ${headColor}  transform overflow-hidden rounded-lg bg-bgcard text-left shadow-xl transition-all sm:my-8 flex flex-col `}>
 
                            <div class="flex flex-row justify-between items-center w-full h-[40px] text-[17px] text-textGlobalColor font-bold p-2">
                                {heading}
 
                                <span onClick={() => {
                                    setVisible(prev => !prev)
                                }}>
                                    <img src="/customicons/Close.svg" width={20} />
                                </span>
                            </div>
 
                            <div class={`bg-bgcard w-full p-2 mt-1 overflow-y-auto ${showIndexForm ? "h-full mb-[10px]" : showFooter && showFooterArea ? " h-[80%] mb-10 " : showFooterArea ? " h-[80%] mb-10 " : "h-full mb-0 "} ${cstmClass}`}>
                                {
                                    innerContent
                                }
                            </div>
 
                            {
                                showFooter && <>
                                    <div class="absolute bottom-0 w-full bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button type="button" onClick={() => {
                                            setVisible(prev => !prev)
                                        }} class="mt-3 mx-2 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
                                            Cancel
                                        </button>
 
                                        {
                                            buttons.map((ittm) => {
                                                return <button
                                                    onClick={() => {
                                                        ittm.clickFun()
                                                    }}
                                                    type="button"
                                                    class=" mx-2 inline-flex w-full justify-center rounded-md bg-sidebar px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sidebar sm:w-auto">{ittm.name}</button>
                                            })
                                        }
 
 
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        }
    </>
}
 
export default Modal
 