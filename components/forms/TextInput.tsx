'use client'


import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import "react-time-picker-typescript/dist/style.css";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Options } from "@/lib/types";
import { Textarea } from "../ui/textarea";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
// import { useState } from "react";

import dayjs from 'dayjs';
// import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
// import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
import { ThreeCircles } from 'react-loader-spinner'

interface TextInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  type?: string;
  placeholder?: string;
  label:string;
  options?:Options[]|null

}

 // Handle space key event
  // Handle space key event to insert a comma
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === ' ') {
      e.preventDefault(); // Prevent default space behavior
      const target = e.target as HTMLTextAreaElement;
      const { selectionStart, selectionEnd, value } = target;
      const newValue = value.substring(0, selectionStart) + ', ' + value.substring(selectionEnd);
      target.value = newValue;
      target.setSelectionRange(selectionStart + 2, selectionStart + 2); // Place cursor after the comma
    }
  };

const TextInput = <T extends FieldValues>({ name, control, type, placeholder,label }: TextInputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
            <FormLabel >{label}</FormLabel>
          <FormControl>
            <Input className=" shadow-sm  focus:outline-none  focus:ring-blue-100 " type={type} placeholder={placeholder} {...field} />
          </FormControl>
          <FormMessage className="text-xs mt-2" />
          
        </FormItem>
      )}
    />
  );
};

export default TextInput;

//text area input
export const TextAreaInput = <T extends FieldValues>({ name, control, placeholder,label }: TextInputProps<T>) => {
 
  
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
            <FormLabel >{label}</FormLabel>
          <FormControl>
            <Textarea 
            className=" shadow-sm  focus:outline-none  focus:ring-blue-100 " 
             placeholder={placeholder} 
             {...field} 
             onKeyDown={handleKeyDown}
             />
          </FormControl>
          <FormMessage className="text-xs mt-2" />
          
        </FormItem>
      )}
    />
  );
};

export const TextAreaInputNoKeyDown = <T extends FieldValues>({ name, control, placeholder,label }: TextInputProps<T>) => {
 
  
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
            <FormLabel >{label}</FormLabel>
          <FormControl>
            <Textarea 
            className=" shadow-sm  focus:outline-none  focus:ring-blue-100 " 
             placeholder={placeholder} 
             {...field} 
            
             />
          </FormControl>
          <FormMessage className="text-xs mt-2" />
          
        </FormItem>
      )}
    />
  );
};





//select menu
export function SelectForm<T extends FieldValues>({ name, control, type,options, placeholder,label }: TextInputProps<T>)  {
  return(
    <FormField
    control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options?.map((item,i)=>(
                    <SelectItem key={item.id} 
                    value={item.title}>{item.title}
                    </SelectItem>

                  ))}
                  
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        />
  )
}

// select menu with ID
export function SelectFormWithValueId<T extends FieldValues>({ name, control, type,options, placeholder,label }: TextInputProps<T>)  {
  return(
    <FormField
    control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {options?.map((item,i)=>(
                    <SelectItem key={item.id} 
                    value={item.id} className="capitalize">{item.title}
                    </SelectItem>

                  ))}
                  
                </SelectContent>
              </Select>
              
              <FormMessage />
            </FormItem>
          )}
        />
  )
}
//date of birth

export function DateOfBirth<T extends FieldValues>({ name, control, type, placeholder,label }: TextInputProps<T>){
  return(
<FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{label}</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 mt-3 text-left font-normal",
                        !field.value && "text-muted-foreground mt-3"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() 
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              
              <FormMessage />
            </FormItem>
          )}
        />
  )
}

//phone input
export function PhoneNumberInput<T extends FieldValues>({ name, control, type, placeholder,label }: TextInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
            <FormLabel >{label}</FormLabel>
          <FormControl>
            <PhoneInput 
             
                {...field}
                international
                countryCallingCodeEditable={false}
                defaultCountry="NG"
                style={{
                  backgroundColor: 'white',
                 // boxShadow: '0 0px 2px rgba(0, 0, 0, 0.05)',
                 
                  borderRadius: '0.360rem',
                  fontSize: '0.875rem',
                 outlineColor: '#d3d3d3',
                  outlineStyle: 'solid ',

                  outlineWidth: '2px',
                }}
              />
          </FormControl>
          <FormMessage className="text-xs mt-2" />
          
        </FormItem>
      )}
    />
  );
};

//time picker
export function TimeInput<T extends FieldValues>({ name, control, label }: TextInputProps<T>) {
  return (
    <div>
      {/* TimePicker for selecting time */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <FormMessage className="text-xs mt-2" />
                <MobileTimePicker
                 
                  value={field.value ? dayjs(field.value) : null}
                  onChange={(newValue) => {
                    field.onChange(newValue ? newValue.format('HH:mm') : null);
                  }}
                />
              </FormControl>
              
            </FormItem>
          )}
        />
      </LocalizationProvider> 
    
      
   
    </div>
  );
}

type ButtonInputProps= {
  
  type: "button" | "submit" | "reset" ;
  title:string
}

export function CustomButton({title,type}:ButtonInputProps){
  return(
    <div>
      <button type={type} 
      className="text-white bg-gradient-to-r from-cyan-500
       to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
        focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-sm 
         text-sm px-5 py-2.5 text-center me-2 mb-2">
          {title}
          
          </button>
    </div>
  )
}

export function CustomOutlineButton({title,type}:ButtonInputProps){
  return(
    <div>
      <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-sm group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">
<span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-sm group-hover:bg-opacity-0">
{title}
</span>
</button>
    </div>
  )
}

export function LoadingButton(){
  return(
    <div>
      <button type='button' disabled
      className="text-white bg-gradient-to-r from-cyan-500
       to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none
        focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-sm 
         text-sm px-5 py-2.5 text-center me-2 mb-2">
          <ThreeCircles
  visible={true}
  height="30"
  width="30"
  color="white"
  ariaLabel="three-circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
          
          </button>
    </div>
  )
}