import axiosInstance from "../../../axios";
import { daysInIndonesian } from "../../../dictionary";

const getAllDoctors = async () => {
  try {
    const response = await axiosInstance.get("account/users/doctor");
    return response.data;
  } catch (error) {
    return error;
  }
};

const getDoctorById = async (user_id, date_joined) => {
  try {
    const response = await axiosInstance.get(
      `account/users/doctor/${user_id}/${date_joined}`
    );
    return response.data;
  } catch (error) {
    return error;
  }
};

const getSchedules = async () => {
  try {
    const response = await axiosInstance.get("medrec/schedule/");
    const data = await response.data;
    data.forEach((res) => {
      res.day = daysInIndonesian[res.day];
      res.start_time = res.start_time.slice(0, 5);
      res.end_time = res.end_time.slice(0, 5);
    });
    return data;
  } catch (error) {
    return error;
  }
};

const getScheduleById = async (id) => {
  try {
    const response = await axiosInstance.get(`medrec/schedule/${id}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export { getAllDoctors, getSchedules, getScheduleById, getDoctorById };
