import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect } from 'react';
import { useCreateStudentMutation, useUpdateStudentMutation } from '@/store/api/adminAPI';
import IconX from '@/components/icon/icon-x';
import FormInput from '@/components/applicationUI/FormInput';
import { useForm } from 'react-hook-form';

interface StudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    // studentData: { id: string; name: string; email: string; mobile: string; shift: string; fixedSeatNumber?: number };
    studentData: any;
}

const formFields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    { label: "Mobile", name: "mobile", type: "text" },
    { label: "Shift", name: "shift", type: "select", options: [{ value: "morning", label: "Morning" }, { value: "evening", label: "Evening" }] },
    { label: "Fixed Seat Number", name: "fixedSeatNumber", type: "number" },
    { label: "Amount", name: "amount", type: "number" },
    // { label: "Date of Joining", name: "dateOfJoining", type: "date" },
  ];
  

const StudentModal: React.FC<StudentModalProps> = ({ isOpen, onClose, studentData }) => {
    const { register, handleSubmit, reset } = useForm({ defaultValues: studentData||{}});
    const [updateStudent] = useUpdateStudentMutation();
    const [createStudent] = useCreateStudentMutation();


    useEffect(()=>{
        if(studentData){
            reset(studentData);
        }else{
            reset({
                name: "",
                email: "",
                mobile: "",
                shift: "",
                fixedSeatNumber: "",
                amount: "",
                active: false,
            });
        }
    },[studentData, reset])

    const onSubmit = async (data: any) => {
        try {
            let formData = {
                amount:parseInt(data?.amount),
                email:data?.email,
                fixedSeatNumber:parseInt(data?.fixedSeatNumber),
                mobile:data?.mobile,
                name:data?.name,
                photo:data?.photo,
                shift:data?.shift,
                id:data?._id,
                active:data?.active,
                ...(!studentData && { libraryId: "67a22f8b9b9e29e00d5f7e69", adminId:"67a22f8b9b9e29e00d5f7e67" })
            }
            studentData ? await updateStudent({...formData }).unwrap():  await createStudent({...formData }).unwrap() ;
            onClose();
        } catch (error) {
            console.error('Update failed:', error);
        }
    };
    console.log(studentData,'studentData')

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-50" open={isOpen} onClose={onClose}>
                <div className="fixed inset-0 bg-black/60" />
                <div className="flex min-h-screen items-center justify-center px-4">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="panel w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg">
                            <div className="flex items-center justify-between pb-4 ">
                                <h5 className="text-lg font-semibold">Update Student</h5>
                                <button type="button" className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                                    <IconX />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full max-w-sm min-w-[200px]">
                                {formFields.map((field) => (
                                    <FormInput key={field.name} {...field} register={register} defaultValue={studentData?.[field.name]} />
                                ))}

                                {/* Active Checkbox */}
                                <div className="flex items-center space-x-2">
                                    <input {...register("active")} type="checkbox" className="form-checkbox" defaultChecked={studentData?.active} />
                                    <label className="text-slate-700">Active</label>
                                </div>

                                {/* Buttons */}
                                <button type="submit" className="btn btn-primary w-full">{studentData?"Update":"Create"}</button>
                                <button type="button" className="btn btn-secondary w-full" onClick={onClose}>Cancel</button>
                            </form>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default StudentModal;
