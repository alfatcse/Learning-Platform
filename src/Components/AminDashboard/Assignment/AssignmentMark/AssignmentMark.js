import React from "react";
import { useGetAssignmentsQuery } from "../../../../features/assignment/assignmentAPI";
import Error from "../../../UI/Error";
import Loading from "../../../UI/Loading";
import SingleAssignmentMark from "./SingleAssignmentMark";

const AssignmentMark = () => {
  const { data, isLoading, isError } = useGetAssignmentsQuery();
  let assignmentStatus, assignmentMarkdata;
  if (isLoading) {
    assignmentStatus = <Loading></Loading>;
    assignmentMarkdata = <Loading></Loading>;
  }
  if (!isLoading && isError) {
    assignmentStatus = <Error message={"An Error Occurred"}></Error>;
    assignmentMarkdata = <Error message={"An Error Occurred"}></Error>;
  }
  if (!isError && !isLoading && data?.length === 0) {
    assignmentStatus = <div>No Record Found</div>;
    assignmentMarkdata = <div>No Record Found</div>;
  }
  let pending,published;
  if (!isError && !isLoading && data?.length > 0) {
    pending = data.filter((t) => t.status === "pending");
    published = data.filter((t) => t.status === "published");

    assignmentMarkdata = data.map((d) => (
      <SingleAssignmentMark assignmentMark={d}></SingleAssignmentMark>
    ));
  }
  return (
    <section class="py-6 bg-primary">
      <div class="mx-auto max-w-full px-5 lg:px-20">
        <div class="px-3 py-20 bg-opacity-10">
          {pending || data ? (
            <ul class="assignment-status">
              <li>
                Total <span>{data?.length}</span>
              </li>
              <li>
                Pending <span>{pending?.length}</span>
              </li>
              <li>
                Mark Sent <span>{published?.length}</span>
              </li>
            </ul>
          ) : (
            assignmentStatus
          )}
          <div class="overflow-x-auto mt-4">
            <table class="divide-y-1 text-base divide-gray-600 w-full">
              <thead>
                <tr>
                  <th class="table-th">Assignment</th>
                  <th class="table-th">Date</th>
                  <th class="table-th">Student Name</th>
                  <th class="table-th">Repo Link</th>
                  <th class="table-th">Mark</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-600/50">
                {" "}
                {assignmentMarkdata}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssignmentMark;
