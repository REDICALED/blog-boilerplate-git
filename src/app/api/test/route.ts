/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// getCloudflareContext()를 사용하여 Next.js 라우트의 시그니처 충돌을 피하고 바인딩에 접근합니다.
// request 인자가 사용되지 않으므로, ESLint 경고를 피하기 위해 '_'로 시작합니다.
export async function GET(_request: Request) {
  try {
    // ESLint 및 TypeScript 오류를 피하기 위해 명시적으로 'any' 캐스팅을 사용합니다.
    const { env } = getCloudflareContext() as any; 

    // wrangler.jsonc에 정의된 바인딩 이름으로 구조 분해합니다.
    const d1 = env.BLOG_BOILERPLATE_D1;
    const r2 = env.BLOG_BOILERPLATE_R2;

    // --- D1 테스트: 데이터 조회 ---
    // d1.prepare().all()은 Promise<D1Result>를 반환합니다.
    const d1Result = await d1.prepare("SELECT * FROM test_table").all();
    
    // --- R2 테스트: 쓰기 및 읽기 ---
    const testKey = "verification-status";
    await r2.put(testKey, "R2 is working");
    // r2.get()의 결과를 바로 .text()로 변환하여 사용
    const r2Data = (await r2.get(testKey))?.text(); 

    // 성공 응답 반환
    return NextResponse.json({
      status: "SUCCESS: D1/R2 연동 확인 완료.",
      d1_test_rows: d1Result.results,
      r2_test_data: await r2Data,
    });

  } catch (error) {
    // 실패 응답 반환
    console.error("Binding Test Failed:", error);
    return NextResponse.json({
      status: "FAILURE: 바인딩 접근 실패. OpenNext 설정을 확인하세요.",
      error: error instanceof Error ? error.message : "알 수 없는 오류"
    }, { status: 500 });
  }
}