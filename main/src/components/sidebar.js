import {defineAsyncComponent} from "vue";

const Sidebar = defineAsyncComponent(() => import("sidebar/App"));
export default Sidebar;
