"use client";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { AiFillGithub, AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import LoadingState from "@/components/LoadingState";

export default function Home() {
  const [showLoader, setShowLoader] = React.useState(false);
  const [finishedLoading, setFinishedLoading] = React.useState(false);
  const [subjects, setSubjects] = useState<
    { name: string; grade: string; credits: string }[]
  >([{ name: "", grade: "", credits: "" }]);

  const [gpa, setGPA] = useState(0);

  const handleAddSubject = () => {
    setSubjects([...subjects, { name: "", grade: "", credits: "" }]);
  };

  type SubjectField = "name" | "grade" | "credits";

  const handleSubjectChange = (
    index: number,
    field: SubjectField,
    value: string
  ) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index][field] = value;
    setSubjects(updatedSubjects);
  };

  const computeGPA = () => {
    setShowLoader(true);
    setFinishedLoading(false);
    setTimeout(() => {
      const totalCredits = subjects.reduce(
        (total, subject) => total + parseFloat(subject.credits),
        0
      );
      console.log("Total Credits:", totalCredits);

      const weightedGrades = subjects.reduce((total, subject) => {
        const gradePoints = getGradePoints(subject.grade);
        const credits = parseFloat(subject.credits); // Add this line for debugging
        console.log("Grade Points:", gradePoints);
        console.log("Credits:", credits);
        return total + gradePoints * credits;
      }, 0);
      console.log("Weighted Grades:", weightedGrades);

      const calculatedGPA = weightedGrades / totalCredits;
      setGPA(parseFloat(calculatedGPA.toFixed(2)));

      setSubjects([]);
      setFinishedLoading(true);
      setShowLoader(false);
    }, 5000);
  };

  if (showLoader) {
    return <LoadingState finished={finishedLoading} />;
  }

  const getGradePoints = (grade: string): number => {
    const numericGrade = parseFloat(grade);

    if (!isNaN(numericGrade)) {
      if (numericGrade >= 4.0) return 4.0;
      else if (numericGrade >= 3.7) return 3.7;
      else if (numericGrade >= 3.3) return 3.3;
      else if (numericGrade >= 3.0) return 3.0;
      else if (numericGrade >= 2.7) return 2.7;
      else if (numericGrade >= 2.3) return 2.3;
      else if (numericGrade >= 2.0) return 2.0;
      else if (numericGrade >= 1.7) return 1.7;
      else if (numericGrade >= 1.3) return 1.3;
      else if (numericGrade >= 1.0) return 1.0;
      else return 0.0; // For numeric grades below 1.0
    } else {
      switch (grade.trim().toUpperCase()) {
        case "A":
          return 1.0;
        case "A-":
          return 1.3;
        case "B+":
          return 1.7;
        case "B":
          return 2.0;
        case "B-":
          return 2.3;
        case "C+":
          return 2.7;
        case "C":
          return 3.0;
        case "C-":
          return 3.3;
        case "D+":
          return 3.7;
        case "D":
          return 4.0;
        case "F":
          return 0.0;

        default:
          console.log(`Unrecognized grade: ${grade}`);
          return 0.0;
      }
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-20">
      <Card className="mt-10">
        <div className="flex flex-col w-full p-6 md:p-10 text-center shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Calculate GPA</CardTitle>
            <CardDescription>
              Calculate your Grade Point Average based on subjects, grades, and
              credits.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {subjects.map((subject, index) => (
              <div
                key={index}
                className="flex md:flex-row flex-col items-center justify-center mt-5 w-full gap-3 md:gap-5"
              >
                <input
                  type="text"
                  placeholder="Subject Name"
                  value={subject.name}
                  onChange={(e) =>
                    handleSubjectChange(index, "name", e.target.value)
                  }
                  className="border-none bg-slate-200/50 dark:bg-slate-800 outline-none px-2 py-1 rounded-md shadow-xl dark:text-white text-black placeholder:text-black dark:placeholder:text-white w-full"
                />
                <input
                  type="text"
                  placeholder="Grade"
                  value={subject.grade}
                  onChange={(e) =>
                    handleSubjectChange(index, "grade", e.target.value)
                  }
                  className="border-none bg-slate-200/50 dark:bg-slate-800 outline-none px-2 py-1 rounded-md shadow-xl dark:text-white text-black placeholder:text-black dark:placeholder:text-white w-full"
                />
                <input
                  type="text"
                  placeholder="Credits"
                  value={subject.credits}
                  onChange={(e) =>
                    handleSubjectChange(index, "credits", e.target.value)
                  }
                  className="border-none bg-slate-200/50 dark:bg-slate-800 outline-none px-2 py-1 rounded-md shadow-xl dark:text-white text-black placeholder:text-black dark:placeholder:text-white w-full"
                />
              </div>
            ))}
          </CardContent>
          <div className="flex flex-col md:flex-row items-center justify-center md:items-end md:justify-end gap-2 mt-1 md:mr-8 mr-0">
            <button
              className="bg-black dark:bg-white hover:opacity-70 dark:text-black text-white w-full md:w-auto rounded-lg text-center py-2 px-4 text-xs"
              onClick={handleAddSubject}
            >
              Add Subject
            </button>
            <button
              className="bg-emerald-800 hover:opacity-70 dark:bg-emerald-300 dark:text-black text-white w-full md:w-auto rounded-lg text-center py-2 px-4 text-xs"
              onClick={computeGPA}
            >
              Compute GPA
            </button>
          </div>
          {gpa !== 0 && (
            <div className="dark:bg-emerald-300 dark:text-black bg-emerald-800 text-white p-6 mt-3 md:mt-0 rounded-full w-[120px] h-[120px] text-center mx-auto border-4 border-green-800 shadow-lg">
              <p>
                Your GPA is <b>{gpa.toFixed(2)}</b>
              </p>
            </div>
          )}

          {/* Display Inputted Subjects */}
          {subjects.length > 0 && (
            <div className="mt-4">
              <Table className="text-left">
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject Name</TableHead>
                    <TableHead>Course Grade</TableHead>
                    <TableHead>Units</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjects.map((subject, index) => (
                    <TableRow key={index}>
                      <TableCell>{subject.name}</TableCell>
                      <TableCell>{subject.grade}</TableCell>
                      <TableCell>{subject.credits}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </Card>
      <div className="flex items-center justify-center gap-3 mt-10 mb-2">
        <a
          href="https://github.com/kylemastercoder14"
          target="_blank"
          className="bg-black dark:bg-white dark:text-black text-white p-2 rounded-md text-lg hover:opacity-70"
        >
          <AiFillGithub />
        </a>
        <a
          href="https://facebook.com/kyleandre.lim29"
          target="_blank"
          className="bg-black dark:bg-white dark:text-black text-white p-2 rounded-md text-lg hover:opacity-70"
        >
          <AiFillFacebook />
        </a>
        <a
          href="https://www.instagram.com/kylndrdvdlm"
          target="_blank"
          className="bg-black dark:bg-white dark:text-black text-white p-2 rounded-md text-lg hover:opacity-70"
        >
          <AiFillInstagram />
        </a>
      </div>
      <p className="text-center mb-5 text-sm">
        GPA Wizard Calculator | Developed By: Kyle Andre Lim
      </p>
      <ThemeToggle />
    </div>
  );
}
