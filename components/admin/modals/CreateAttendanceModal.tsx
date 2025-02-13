import InputBox from "@/components/applicationUI/InputBox";
import { useAssignSeatMutation, useGetStudentsQuery, useVacantSeatMutation } from "@/store/api/adminAPI";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, Dispatch, SetStateAction, useState } from "react";
import Select from "react-select";

interface CreateAttendanceModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  createAttendanceData: any;
  seatIndexMapping: any;
  ids: any;
  stuDetails:any;
}

const CreateAttendanceModal: React.FC<CreateAttendanceModalProps> = ({
  isOpen,
  setIsOpen,
  createAttendanceData,
  seatIndexMapping,
  ids,
  stuDetails
}) => {
  const { data: students } = useGetStudentsQuery({ active: true }, {
    selectFromResult: ({ data }) => ({
      data: Array.isArray(data?.data)
        ? data.data.map((student: { name: string; _id: string; shift: string }) => ({
            label: student.name,
            value: student._id,
            shift: student.shift,
          }))
        : [],
    }),
  });

  const [assignSeat, { isLoading, isError }] = useAssignSeatMutation();
  const [vacantSeat, { isLoading:vacantSeatLoading }] = useVacantSeatMutation();


  // State to store selected student details
  const [selectedStudent, setSelectedStudent] = useState<{
    studentId: string;
    shift: string;
    studentName: string;
  } | null>(null);

  // Handle seat assignment
  const handleAssignSeat = async () => {
    if (!selectedStudent) {
      alert("Please select a student.");
      return;
    }

    try {
      const seatData = {
        libraryId: ids?.libraryId,
        adminId: ids?.adminId,
        studentId: selectedStudent.studentId,
        shift: selectedStudent.shift?.toUpperCase(),
        rowIndex: seatIndexMapping[`${createAttendanceData?.seatNumber}`]?.[0],
        columnIndex: seatIndexMapping[`${createAttendanceData?.seatNumber}`]?.[1],
        studentName: selectedStudent.studentName,
      };

      const response = await assignSeat(seatData).unwrap();
      console.log("Seat assigned successfully:", response);
      if(!isLoading){
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Failed to assign seat:", error);
    }
  };

  const handleVacantSeat = async () => {
    try {
      const seatData = {
        adminId: ids?.adminId,
        shift: stuDetails?.shift?.toUpperCase(),
        seatNumber: createAttendanceData?.seatNumber,
        studentName: stuDetails?.studentName,
        studentId: stuDetails?.studentID,
      };

      const response = await vacantSeat(seatData).unwrap();
      console.log("Seat assigned successfully:", response);
      if(!isLoading){
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Failed to assign seat:", error);
    }
  };
  const defaultStudent = students.find((student: { label: string; }) => student.label === 'Maggie Durgan MD');


  console.log(createAttendanceData,ids,seatIndexMapping,stuDetails,defaultStudent,'create attendace modal')
  console.log(stuDetails,'stuDetails')

  return (
    <div className="mb-5" onClick={() => setIsOpen(true)}>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" open={isOpen} onClose={() => setIsOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0" />
          </Transition.Child>
          <div className="fixed inset-0 bg-[black]/60 z-[999] px-4">
            <div className="flex items-start justify-center min-h-screen px-4">
              <Dialog.Panel className="panel border-0 p-0 rounded-lg overflow-hidden w-full max-w-lg my-8 text-black dark:text-white-dark">
                <div className="flex bg-[#fbfbfb] dark:bg-[#121c2c] items-center justify-between px-5 py-3">
                  <h5 className="font-bold text-lg">
                    {`${createAttendanceData?.status === "FILLED"?"Vacent":"Assign"} Seat No ${createAttendanceData?.seatNumber}`}
                  </h5>
                </div>
                <div className="p-5">
                  <div className="mb-5">
                    <label>Student Name</label>
                    <Select
                      placeholder="Select a student"
                      options={students}
                      value={stuDetails?.studentID?{label:stuDetails?.studentName, value:stuDetails?.studentID}:{label:selectedStudent?.studentName,value:selectedStudent?.studentName}}
                      onChange={(selectedOption:any) => {
                        if (selectedOption) {
                          setSelectedStudent({
                            studentId: selectedOption.value,
                            shift: selectedOption.shift,
                            studentName: selectedOption.label,
                          });
                        }
                      }}

                    />
                  </div>
                  {stuDetails?.studentID&&
                  <div>
                    <InputBox label={"Shift"} id = {stuDetails?.studentID} value= {stuDetails?.shift}/>
                  </div>}
                  <div className="flex justify-end items-center mt-8">
                    <button
                      onClick={() => setIsOpen(false)}
                      type="button"
                      className="btn btn-outline-danger"
                    >
                      Discard
                    </button>
                    <button
                      type="button"
                      onClick={stuDetails?.studentName?handleVacantSeat:handleAssignSeat}
                      className="btn btn-primary ltr:ml-4 rtl:mr-4"
                      disabled={isLoading}
                    >
                      {isLoading ? "Assigning..." : stuDetails?.studentName?"Vacant Seat":"Assign Seat"}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default CreateAttendanceModal;
