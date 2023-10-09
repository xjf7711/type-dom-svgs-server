import * as fs from 'fs';
import { Injectable } from '@nestjs/common';
import { TypeNodeParser } from 'type-node-parser';
import { toHump } from '../utils';
const SVG_PATH = './src/common-svg/svg-files';
const INDEX_PATH = '../type-dom-svgs/src/common';
const CLASS_PATH = '../type-dom-svgs/src/common';
@Injectable()
export class CommonSvgService {
  async generateSvgClasses() {
    fs.readdir(SVG_PATH, (err, files) => {
      if (err) {
        return console.error(err);
      }
      console.log('files is ', files);
      // 将 svg 转换成 ts 文件
      files.forEach((file) => {
        // 获得文件扩展名
        const fileExtension = file.split('.').pop();
        if (fileExtension !== 'svg') {
          return;
        }
        fs.readFile(SVG_PATH + '/' + file, (err, data) => {
          if (err) {
            return console.error(err);
          }
          const svgStr = data.toString();
          console.log('svgStr is ', svgStr);
          // const parser = new Parser({});
          const parser = new TypeNodeParser({});
          const svgDom = parser.parseFromString(svgStr);
          console.log('svgDom is ', svgDom);
          const paths = [];
          svgDom?.children.forEach((child) => {
            console.log('child is ', child);
            console.log('path.attributes is ', child.attributes);
            if (child.nodeName === 'path') {
              paths.push(child);
              console.log('child.attributes is ', child.attributes);
            }
          });
          // 输出匹配到的结果
          console.log('paths is ', paths);
          const fileName = file.replace('.svg', '');
          const className =
            'Td' +
            toHump(fileName) // 获取类名
              .replaceAll('+', 'Plus') +
            'Svg';
          // .replaceAll('-', 'Minus');
          let template = `import { SvgPath, TypeHtml, TypeSvgSvg } from 'type-dom.ts';
export class ${className} extends TypeSvgSvg {
  className: '${className}';
  childNodes: SvgPath[];
  constructor(public parent: TypeHtml) {
    super();
    this.className = '${className}';
    this.addAttrObj({
      name: '${className}',
      title: '${className}'
    });`;
          const viewBoxItem = svgDom.attributes.find(
            (item) => item.name === 'viewBox',
          );
          if (viewBoxItem) {
            template += `
    this.addAttrObj({
      viewBox: '${viewBoxItem.value}',
    });`;
          } else {
            const width = svgDom.attributes.find(
              (item) => item.name === 'width',
            ).value;
            const height = svgDom.attributes.find(
              (item) => item.name === 'height',
            ).value;
            if (width && height) {
              template += `
    this.addAttrObj({
      viewBox: '0 0 ${width} ${height}',
    });`;
            }
          }
          template += `
    this.resetSize(24, 24);
    this.childNodes = [];`;
          if (Array.isArray(paths)) {
            paths.forEach((path, index) => {
              // const dom = parser.parseFromString(path);
              console.log('path is ', path);
              const data = path.attributes.find(
                (item) => item.name === 'd',
              ).value;
              console.log('data is ', data);
              template += `
    const path${index} = new SvgPath(this);
    path${index}.setData(
      '${data}',
    );
    this.childNodes.push(path${index});`;
            });
          }
          template += `
  }
}
`;
          fs.writeFile(`${CLASS_PATH}/${fileName}.ts`, template, (err) => {
            if (err) {
              return console.error(fileName + '转换失败', err);
            }
            console.log(fileName + '转换成功');
          });
        });
      });
      // getSvgIndex(files);
      // generateSvgCommonList(files);
    });
    return '生成svg文件成功！';
  }
  // 导出目录
  async generateSvgIndexes() {
    fs.readdir(SVG_PATH, (err, files) => {
      if (err) {
        return console.error(err);
      }
      console.log('files is ', files);
      let template = '';
      files.forEach((file) => {
        const fileName = file.replace('.svg', ''); // 获取文件名
        const className =
          'Td' + toHump(fileName).replaceAll('+', 'Plus') + 'Svg';
        template += `export { ${className} } from './${fileName}';
`;
      });
      fs.writeFile(INDEX_PATH + '/index.ts', template, (err) => {
        if (err) {
          return console.error(err);
        }
        console.log('index.ts 注册代码重新生成！');
      });
    });
  }
  // 生成展示列表页
  generateSvgList() {
    fs.readdir(SVG_PATH, (err, files) => {
      if (err) {
        return console.error(err);
      }
      console.log('files is ', files);
      let template = `import { IStyle, TypeDiv } from 'type-dom.ts';
import { SVGSRoot } from './svgs-root';
import {`;
      files.forEach((file) => {
        const fileName = file.replace('.svg', ''); // 获取文件名
        const className =
          'Td' + toHump(fileName).replaceAll('+', 'Plus') + 'Svg';
        template += `
  ${className},`;
      });

      template += `
} from '../src';
export class CommonSvgList extends TypeDiv {
  className: 'CommonSvgList';
  constructor(public parent: SVGSRoot) {
    super();
    console.log('CommonSvgList constructor . ');
    this.className = 'CommonSvgList';
    this.addStyleObj({
      padding: '30px'
    });
    const $svgStyle: Partial<IStyle> = {
      padding: '10px',
      border: '1px solid #ddd'
    };
    this.createItems(this, [`;
      files.forEach((file) => {
        const fileName = file.replace('.svg', ''); // 获取文件名
        const className =
          'Td' + toHump(fileName).replaceAll('+', 'Plus') + 'Svg';
        template += `
      {
        TypeClass: ${className},
        propObj: {
          attrObj: {
            width: '2em',
            height: '2em',
          },
          styleObj: $svgStyle
        }
      },`;
      });
      template += `
    ]);
  }
}`;
      fs.writeFile('../public/common-svg-list.ts', template, (err) => {
        if (err) {
          return console.error(err);
        }
        console.log('common-svg-list.ts 注册代码重新生成！');
      });
    });
  }
}
