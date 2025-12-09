import React from 'react';
import { View } from 'react-native';

export const Table = ({ children, ...props }) => <View {...props}>{children}</View>;
export const Row = ({ data, style, textStyle, ...props }) => <View style={style} {...props}>{data}</View>;
export const Rows = ({ data, style, textStyle, ...props }) => <View style={style} {...props}>{data}</View>;
export const Col = ({ data, style, textStyle, ...props }) => <View style={style} {...props}>{data}</View>;
export const Cols = ({ data, style, textStyle, ...props }) => <View style={style} {...props}>{data}</View>;
export const Cell = ({ data, style, textStyle, ...props }) => <View style={style} {...props}>{data}</View>;
export const TableWrapper = ({ children, style, ...props }) => <View style={style} {...props}>{children}</View>;