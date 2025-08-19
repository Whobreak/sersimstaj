// declarations.d.ts
declare module "react-native-reusables" {
  import { ComponentType } from "react";
  import { ViewProps, TextProps, ImageProps, StyleProp, ViewStyle } from "react-native";

  export interface TabItem {
    key: string;
    title?: string;
    icon?: JSX.Element;
    badge?: string | number;
  }

  export interface TabsProps extends ViewProps {
    items: TabItem[];
    onTabPress?: (key: string) => void;
    style?: StyleProp<ViewStyle>;
    initialTabIndex?: number;
  }

  export const Tabs: ComponentType<TabsProps>;
  // İleride başka bileşenler eklenirse buraya declare edebilirsin
}
