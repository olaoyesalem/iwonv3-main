interface MenuItem {
  id: number;
  page: string;
  title: string;
  link: string;
  has_dropdown: boolean;
  mega_menu?: boolean;
  sub_menus?: {
    link: string;
    title: string;
    demo_pic?: string;
  }[];
}
[];

const menu_data: MenuItem[] = [
  {
    id: 1,
    page: "home_3",
    has_dropdown: false,
    title: "Home",
    link: "/#hero",
  },
  {
    id: 2,
    page: "home_3",
    has_dropdown: false,
    title: "About",
    link: "/about",
  },

  {
    id: 6,
    page: "home_3",
    has_dropdown: false,
    title: "Contact",
    link: "/contact",
  },
];
export default menu_data;
