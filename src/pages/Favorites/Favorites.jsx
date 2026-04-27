import React, { useState, useMemo } from 'react';
import EmptyState from '../../components/common/EmptyState/EmptyState';
import { FiHeart, FiTrash2, FiEdit2, FiCheck, FiX } from 'react-icons/fi';
import styles from './Favorites.module.scss';

const TABS = [
  { key: 'all', label: '전체' },
  { key: 'supplement', label: '영양제' },
  { key: 'food', label: '식재료' },
  { key: 'recipe', label: '레시피' },
];

const FavoriteCard = ({ item, onRemove, onUpdateMemo }) => {
  const [editing, setEditing] = useState(false);
  const [memo, setMemo] = useState(item.memo || '');

  const handleSave = () => {
    onUpdateMemo(item.id, memo);
    setEditing(false);
  };

  const handleCancel = () => {
    setMemo(item.memo || '');
    setEditing(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardTop}>
        {item.image && (
          <img src={item.image} alt={item.name} className={styles.cardImage} />
        )}
        <div className={styles.cardInfo}>
          <span className={styles.typeBadge}>
            {item.type === 'supplement'
              ? '영양제'
              : item.type === 'food'
                ? '식재료'
                : '레시피'}
          </span>
          <h3 className={styles.cardName}>
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.cardLink}
              >
                {item.name}
              </a>
            ) : (
              item.name
            )}
          </h3>
          <p className={styles.cardDate}>
            {new Date(item.savedAt).toLocaleDateString('ko-KR')}
          </p>
        </div>
        <button className={styles.deleteBtn} onClick={() => onRemove(item.id)}>
          <FiTrash2 size={16} />
        </button>
      </div>

      <div className={styles.memoArea}>
        {editing ? (
          <div className={styles.memoEdit}>
            <input
              className={styles.memoInput}
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              placeholder="메모를 입력하세요"
              autoFocus
            />
            <button className={styles.memoSaveBtn} onClick={handleSave}>
              <FiCheck size={14} />
            </button>
            <button className={styles.memoCancelBtn} onClick={handleCancel}>
              <FiX size={14} />
            </button>
          </div>
        ) : (
          <div className={styles.memoView} onClick={() => setEditing(true)}>
            <FiEdit2 size={13} />
            <span className={styles.memoText}>
              {item.memo ? item.memo : '메모 추가...'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

const Favorites = ({ list = [], onRemove, onUpdateMemo }) => {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = useMemo(() => {
    if (activeTab === 'all') return list;
    return list.filter((item) => item.type === activeTab);
  }, [list, activeTab]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>즐겨찾기</h1>
        <span className={styles.countBadge}>{list.length}개</span>
      </div>

      <div className={styles.tabRow}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`${styles.tabBtn} ${activeTab === tab.key ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className={styles.center}>
          <EmptyState
            title="즐겨찾기가 없어요"
            subtitle="영양제, 식재료, 레시피를 즐겨찾기에 추가해보세요"
            icon={<FiHeart size={48} />}
          />
        </div>
      ) : (
        <div className={styles.grid}>
          {filtered.map((item) => (
            <FavoriteCard
              key={item.id}
              item={item}
              onRemove={onRemove}
              onUpdateMemo={onUpdateMemo}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
