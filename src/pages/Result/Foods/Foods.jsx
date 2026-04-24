// pages/Result/Foods/Foods.jsx
// 식재료 추천 탭 - 프레젠테이셔널
//
// Props:
// - foods: AI가 추천한 식재료 배열
// - onAddFavorite(item): 즐겨찾기 추가 핸들러
// - favorites: 현재 즐겨찾기 목록 (중복 체크용)
// - productMap: 식재료별 상품 목록 { [name]: items[] }
// - loadingMap: 로딩 상태 { [name]: boolean }
// - errorMap: 에러 메시지 { [name]: string }
// - onViewRecipe(foodName): 레시피 페이지 이동 핸들러
// - preferredMall: 선호 쇼핑몰 ('naver' | 'coupang' | 'both')
// - onRemoveFavorite(link): 즐겨찾기 제거 핸들러

function Foods({
  foods,
  onAddFavorite,
  favorites,
  productMap,
  errorMap,
  loadingMap,
  onViewRecipe,
  preferredMall,
  onRemoveFavorite,
}) {
  const gridStyle = `
    .productGrid {
      grid-template-columns: repeat(4, 1fr) !important;
    }
    @media (max-width: 640px) {
      .productGrid {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
  `;

  const isSaved = (link) => {
    return favorites.some((fav) => fav.link === link);
  };

  if (!foods || foods.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#7a7a7a" }}>
        <p>추천 식재료가 없어요</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <style>{gridStyle}</style>
      {foods.map(({ name, description }) => (
        <div key={name} style={{ marginBottom: "40px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "18px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  margin: 0,
                }}
              >
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "26px",
                    height: "26px",
                    background: "#1e3a5f",
                    color: "white",
                    borderRadius: "6px",
                    fontSize: "13px",
                    fontWeight: "bold",
                  }}
                >
                  #
                </span>
                <span style={{ fontWeight: "bold" }}>{name}</span>
              </h3>
              {description && (
                <p
                  style={{
                    fontSize: "13px",
                    color: "#7a7a7a",
                    margin: "4px 0 0 0",
                  }}
                >
                  {description}
                </p>
              )}
            </div>

            <button
              onClick={() => onViewRecipe(name)}
              style={{
                padding: "8px 16px",
                background: "#1e3a5f",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "13px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              🍳 레시피 보기
            </button>
          </div>

          {loadingMap[name] && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "16px",
              }}
              className="productGrid"
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    border: "1px solid #e5e5e7",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "160px",
                      background: "#f2f1ec",
                    }}
                  />
                  <div
                    style={{
                      padding: "12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        height: "14px",
                        background: "#f2f1ec",
                        borderRadius: "4px",
                      }}
                    />
                    <div
                      style={{
                        height: "14px",
                        width: "50%",
                        background: "#f2f1ec",
                        borderRadius: "4px",
                      }}
                    />
                    <div
                      style={{
                        height: "36px",
                        background: "#f2f1ec",
                        borderRadius: "6px",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {errorMap[name] && <p style={{ color: "red" }}>{errorMap[name]}</p>}

          {!loadingMap[name] && !errorMap[name] && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "16px",
              }}
              className="productGrid"
            >
              {(productMap[name] || []).map((item) => (
                <div
                  key={item.link}
                  style={{
                    border: "1px solid #e5e5e7",
                    borderRadius: "10px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "160px",
                      overflow: "hidden",
                      background: "#f2f1ec",
                    }}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        loading="lazy"
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "32px",
                        }}
                      >
                        🥬
                      </div>
                    )}
                  </div>

                  <div
                    style={{
                      padding: "12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                      flex: 1,
                    }}
                  >
                    <p
                      style={{
                        fontSize: "13px",
                        margin: 0,
                        lineHeight: "1.5",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{
                        fontSize: "15px",
                        fontWeight: "bold",
                        color: "#2d7a4f",
                        margin: 0,
                      }}
                    >
                      {Number(item.lprice).toLocaleString()}원
                    </p>
                    {item.mallName && (
                      <p
                        style={{
                          fontSize: "12px",
                          color: "#aaaaaa",
                          margin: 0,
                        }}
                      >
                        {item.mallName}
                      </p>
                    )}
                  </div>

                  <div
                    style={{
                      padding: "0 12px 12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    <button
                      onClick={() =>
                        isSaved(item.link)
                          ? onRemoveFavorite(item.link)
                          : onAddFavorite(item)
                      }
                      style={{
                        width: "100%",
                        padding: "8px",
                        background: isSaved(item.link) ? "#d4e7db" : "#ffffff",
                        color: isSaved(item.link) ? "#2d7a4f" : "#1a1a1a",
                        border: "1px solid #e5e5e7",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "13px",
                      }}
                    >
                      {isSaved(item.link) ? "❤️ 저장됨" : "🤍 저장"}
                    </button>
                    {(preferredMall === "both" ||
                      preferredMall === "naver") && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "block",
                          padding: "8px",
                          textAlign: "center",
                          fontSize: "13px",
                          color: "white",
                          background: "#03c75a",
                          borderRadius: "6px",
                          textDecoration: "none",
                        }}
                      >
                        네이버 구매
                      </a>
                    )}
                    {(preferredMall === "both" ||
                      preferredMall === "coupang") && (
                      <a
                        href={`https://www.coupang.com/np/search?q=${encodeURIComponent(name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "block",
                          padding: "8px",
                          textAlign: "center",
                          fontSize: "13px",
                          color: "white",
                          background: "#c00000",
                          borderRadius: "6px",
                          textDecoration: "none",
                        }}
                      >
                        쿠팡 구매
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Foods;
