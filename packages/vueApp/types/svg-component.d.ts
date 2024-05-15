
declare module '~virtual/svg-component' {
  const SvgIcon: import("vue").DefineComponent<{
      name: {
          type: import("vue").PropType<"icon-1" | "icon-2" | "icon-3" | "icon-4">;
          default: string;
          required: true;
      };
  }, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
      name: {
          type: import("vue").PropType<"icon-1" | "icon-2" | "icon-3" | "icon-4">;
          default: string;
          required: true;
      };
  }>>, {
      name: "icon-1" | "icon-2" | "icon-3" | "icon-4";
  }>;
  export const svgNames: ["icon-1" , "icon-2" , "icon-3" , "icon-4"];
  export type SvgName = "icon-1" | "icon-2" | "icon-3" | "icon-4";
  export default SvgIcon;
}
