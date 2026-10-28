// ==========================================
// AURA FITNESS CLUB - Supabase 연동 모듈
// ==========================================

// 기본 정적 설정 (소스코드에 직접 입력 시 사용)
const DEFAULT_SUPABASE_CONFIG = {
  url: "",
  anonKey: ""
};

// 동적 설정 반환 (관리자 페이지에서 입력한 localStorage 설정 우선)
function getSupabaseConfig() {
  const customUrl = localStorage.getItem('aura_supabase_url');
  const customKey = localStorage.getItem('aura_supabase_key');

  return {
    url: customUrl || DEFAULT_SUPABASE_CONFIG.url || "",
    anonKey: customKey || DEFAULT_SUPABASE_CONFIG.anonKey || ""
  };
}

// Supabase 클라이언트 초기화 함수
function getSupabaseClient() {
  if (typeof supabase === 'undefined' || !supabase.createClient) {
    return null;
  }
  
  const config = getSupabaseConfig();
  if (!config.url || !config.anonKey || config.url.includes("your-project-id")) {
    return null;
  }

  try {
    return supabase.createClient(config.url, config.anonKey);
  } catch (error) {
    console.error('Supabase 클라이언트 생성 에러:', error);
    return null;
  }
}

// 연결 상태 확인
function isSupabaseReady() {
  return !!getSupabaseClient();
}
