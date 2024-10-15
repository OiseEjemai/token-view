import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion"

function FaqSection() {
    return (
        <div className='flex flex-col mt-40 ml-5 mr-5'>
            <h1 className='text-center text-2xl'>FAQ</h1>
            <Accordion type="single" className='' collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is registration fee?</AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis, at.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Do I need to connect my wallet</AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod sint numquam quidem minima! Voluptatem, cupiditate!
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>Do I need to complete my KYC</AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod sint numquam quidem minima! Voluptatem, cupiditate!
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>Lorem ipsum dolor sit amet.</AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod sint numquam quidem minima! Voluptatem, cupiditate!
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                    <AccordionTrigger>Lorem ipsum dolor sit amet.</AccordionTrigger>
                    <AccordionContent>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod sint numquam quidem minima! Voluptatem, cupiditate!
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default FaqSection
