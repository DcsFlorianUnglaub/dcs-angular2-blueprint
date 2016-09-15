import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';

@Pipe({
  name: 'dcsMarkdown'
})
export class MarkdownPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      value = '';
    }
    return marked(value);
  }
}
