import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import { FiClock, FiTrash2, FiList, FiAlignLeft } from 'react-icons/fi';
import styles from './History.module.scss';

const History = ({ list = [], onRemove, onClearAll }) => {
  const [viewMode, setViewMode] = useState('list');
  const navigate = useNavigate();

  const handleReenter = (item) => {
    navigate(`/result?q=${encodeURIComponent(item.query)}&shop=both`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>검색 기록</h1>
          <span className={styles.countBadge}>{list.length}개</span>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.viewToggle}>
            <button
              className={`${styles.viewBtn} ${viewMode === 'list' ? styles.viewBtnActive : ''}`}
              onClick={() => setViewMode('list')}
            >
              <FiList size={16} />
            </button>
            <button
              className={`${styles.viewBtn} ${viewMode === 'timeline' ? styles.viewBtnActive : ''}`}
              onClick={() => setViewMode('timeline')}
            >
              <FiAlignLeft size={16} />
            </button>
          </div>
          {list.length > 0 && (
            <button className={styles.clearBtn} onClick={onClearAll}>
              전체 삭제
            </button>
          )}
        </div>
      </div>

      {list.length === 0 ? (
        <div className={styles.center}>
          <EmptyState
            title="검색 기록이 없어요"
            subtitle="증상을 검색하면 기록이 남아요"
            icon={<FiClock size={48} />}
          />
        </div>
      ) : viewMode === 'list' ? (
        <ul className={styles.listView}>
          {list.map((item) => (
            <li
              key={item.id}
              className={styles.listItem}
              onClick={() => handleReenter(item)}
            >
              <div className={styles.itemInfo}>
                <p className={styles.itemQuery}>{item.query}</p>
                <div className={styles.nutrientTags}>
                  {item.nutrients?.map((n, i) => (
                    <span key={i} className={styles.nutrientTag}>
                      {n}
                    </span>
                  ))}
                </div>
                <p className={styles.itemDate}>
                  {new Date(item.searchedAt).toLocaleDateString('ko-KR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
              <button
                className={styles.deleteBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(item.id);
                }}
              >
                <FiTrash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.timeline}>
          {list.map((item, idx) => (
            <div key={item.id} className={styles.timelineItem}>
              <div className={styles.timelineDot} />
              {idx < list.length - 1 && <div className={styles.timelineLine} />}
              <div
                className={styles.timelineCard}
                onClick={() => handleReenter(item)}
              >
                <div className={styles.timelineHeader}>
                  <p className={styles.itemDate}>
                    {new Date(item.searchedAt).toLocaleDateString('ko-KR', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                  <button
                    className={styles.deleteBtn}
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(item.id);
                    }}
                  >
                    <FiTrash2 size={16} />
                  </button>
                </div>
                <p className={styles.itemQuery}>{item.query}</p>
                <div className={styles.nutrientTags}>
                  {item.nutrients?.map((n, i) => (
                    <span key={i} className={styles.nutrientTag}>
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
