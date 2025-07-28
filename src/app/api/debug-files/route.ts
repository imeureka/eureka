import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const projectRoot = process.cwd();
    const possiblePaths = [
      path.join(projectRoot, 'data'),
      path.join(projectRoot, 'data/articles'),
      path.join(projectRoot, 'src/data'),
      path.join(projectRoot, 'src/data/articles'),
    ];

    const result: any = {
      projectRoot,
      directories: {},
      files: {},
    };

    possiblePaths.forEach((dirPath) => {
      const dirName = dirPath.replace(projectRoot, '').replace(/^\//, '');

      try {
        if (fs.existsSync(dirPath)) {
          const files = fs.readdirSync(dirPath);
          result.directories[dirName] = {
            exists: true,
            path: dirPath,
            files: files,
          };

          // .md 파일들만 따로 추출
          const mdFiles = files.filter((f) => f.endsWith('.md'));
          if (mdFiles.length > 0) {
            result.files[dirName] = mdFiles;
          }
        } else {
          result.directories[dirName] = {
            exists: false,
            path: dirPath,
          };
        }
      } catch (error) {
        result.directories[dirName] = {
          exists: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: 'Debug failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
