interface DataType {
  id: number;
  page: string;
  thumb: string;
  title: string;
  designation: string;
}
[];

const team_data: DataType[] = [
  {
    id: 1,
    page: "home_1",
    thumb: "/assets/img/team/team_01.png",
    title: "Yevhen Oleksiy",
    designation: "Blockchain Architect",
  },
  {
    id: 2,
    page: "home_1",
    thumb: "/assets/img/team/team_02.png",
    title: "Pavlo Fedor",
    designation: "Marketing Manger",
  },
  {
    id: 3,
    page: "home_1",
    thumb: "/assets/img/team/team_03.png",
    title: "Serhii Anatolii",
    designation: "Founder & CEO",
  },
  {
    id: 4,
    page: "home_1",
    thumb: "/assets/img/team/team_04.png",
    title: "Ivan Petrov",
    designation: "Blockchain Engineer",
  },

  // home_3

  {
    id: 1,
    page: "home_3",
    thumb: "/assets/img/team/img_01.png",
    title: "Michael Johnson",
    designation: "Developer",
  },
  {
    id: 2,
    page: "home_3",
    thumb: "/assets/img/team/img_02.png",
    title: "Nathaniel Lewis",
    designation: "Founder & CO",
  },
  {
    id: 3,
    page: "home_3",
    thumb: "/assets/img/team/img_03.png",
    title: "Timothy Young",
    designation: "Designer",
  },
  {
    id: 4,
    page: "home_3",
    thumb: "/assets/img/team/img_04.png",
    title: "David Williams",
    designation: "Consultant",
  },
];

export default team_data;
