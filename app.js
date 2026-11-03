const TITLES_BY_CATEGORY = {
  prithvi: {
    1: "Prithvi Convention Center",
    2: "Entrance",
    3: "Reception",
    4: "Lobby",
    5: "Vasudha Plenary hall",
    6: "Vasudha Plenary hall view 2",
    7: "Vasudha Plenary hall view 3",
    8: "Lobby First Floor",
    9: "Plenary hall First Floor",
    10: "Plenary hall Second Floor",
    11: "Lobby second floor",
    12: "Udgam",
    13: "Netrutva",
    14: "Netrutva view 2",
    15: "Lounge",
    16: "Dining lounge",
    17: "VVIP Lounge",
    18: "Dhara One conference room"
  },
  akash: {
    1: "Aakash Management Development facility",
    2: "Aakash Parking View",
    3: "Aakash View 3",
    4: "Aakash View 4",
    5: "Aakash Entry",
    6: "VIP Lounge",
    7: "Executive Dining",
    8: "Auditorium",
    9: "Conference Room",
    10: "Office",
    11: "Office",
    12: "VIP Lounge",
    14: "Classroom",
    15: "Breakout Zones",
    16: "Conference Room",
    17: "Conference Room 2",
    18: "Syndicate Room",
    19: "Lobby",
    20: "Syndicate Room",
    21: "Conference Room 3",
    22: "Breakout Zones",
    23: "Classroom",
    24: "Classroom",
    26: "Cafeteria"
  },
  vayu: {
    1: "VAYU Exhibition Hall",
    2: "Hall Entry",
    3: "Hall View 01",
    4: "Hall View 02"
  },
  mph: {
    1: "MPH View 1",
    2: "MPH View 2",
    3: "MPH View 2",
    4: "Manan",
    5: "Manthan View 1",
    6: "Manthan View 2",
    7: "Chintan"
  },
  virat: {
    1: "Executive Residency",
    2: "Porch",
    3: "Reception",
    4: "Lobby",
    5: "Corridor View",
    6: "Executive Room Common Area",
    7: "Executive Room",
    8: "Standard Room",
    9: "Suite Common Area",
    10: "Suite",
    12: "Blue Room",
    13: "Blue Room View 2",
    14: "Gym",
    15: "Game Zone"
  },
  installation: {
    1: "Ambedkar Statue",
    2: "Airavata",
    3: "Uchchaishrava",
    4: "Shankh Conch",
    5: "GARUDA",
    6: "Kurma Turtle",
    7: "Samudra Manthan"
  },
  helipad: {
    1: "HELIPAD"
  }
};

const HEADINGS_BY_CATEGORY = {
  prithvi: {
    1: 70, 2: 241, 3: 71, 4: 262, 5: 241, 6: 193, 7: 241, 8: 240, 9: 146,
    10: 212, 11: 268, 12: 67, 13: 4, 14: 238, 15: 100, 16: 232, 17: 48, 18: 257
  },
  akash: {
    1: 213, 2: 218, 3: 108, 4: 209, 5: 213, 6: 25, 7: 216, 8: 327, 9: 20,
    10: 268, 11: 207, 12: 349, 14: 328, 15: 84, 16: 89, 17: 191, 18: 333,
    19: 199, 20: 222, 21: 220, 22: 298, 23: 341, 24: 210, 26: 350
  },
  vayu: {
    1: 259, 2: 54, 3: 310, 4: 104
  },
  mph: {
    1: 24, 2: 89, 3: 104, 4: 117, 5: 192, 6: 349, 7: 234
  },
  virat: {
    1: 244, 2: 248, 3: 66, 4: 48, 5: 233, 6: 329, 7: 228, 8: 248,
    9: 70, 10: 44, 11: 286, 12: 238, 13: 228, 14: 350, 15: 10
  },
  "sagar setu": {
    1: 230, 2: 280, 3: 113, 4: 246, 5: 139
  },
  installation: {
    1: 246, 2: 286, 3: 259, 4: 338, 5: 309, 6: 226, 7: 298, 8: 5
  },
  helipad: {
    1: 70
  },
  "view point": {
    1: 287, 2: 348, 3: 158
  },
  exterier: {
    1: 340, 2: 294, 3: 78, 4: 61, 5: 44, 6: 45, 7: 302
  }
};

const DEFAULT_INITIAL_HEADING = 70;
const INITIAL_CAMERA_FOV = 95;
const AUTO_ROTATE_SPEED = 0.4;
const COMPASS_DIRECTIONS = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

function getCategoryKey(folderName) {
  const norm = (folderName || '').toLowerCase();
  if (norm.includes('prithvi') || norm.includes('prathvi')) return 'prithvi';
  if (norm.includes('akash') || norm.includes('aakash')) return 'akash';
  if (norm.includes('vayu')) return 'vayu';
  if (norm.includes('mph')) return 'mph';
  if (norm.includes('virat')) return 'virat';
  if (norm.includes('sagar setu')) return 'sagar setu';
  if (norm.includes('installation')) return 'installation';
  if (norm.includes('helipad')) return 'helipad';
  if (norm.includes('view point')) return 'view point';
  if (norm.includes('exterier') || norm.includes('exterior')) return 'exterier';
  return null;
}

function parseFileNumber(filename) {
  const match = String(filename || '').match(/(?:^|\/)(\d+)\.[a-z0-9]+$/i);
  return match ? parseInt(match[1], 10) : null;
}

function resolveSceneTitle(folderName, filename, viewIndex = 0) {
  const key = getCategoryKey(folderName);
  const num = parseFileNumber(filename);
  if (key && TITLES_BY_CATEGORY[key]) {
    const table = TITLES_BY_CATEGORY[key];
    if (num !== null && table[num]) return table[num];
    if (table[filename]) return table[filename];
  }
  if (key === 'helipad') return 'HELIPAD';
  const cleanCategoryName = (folderName || '').replace(/^\d+\s*/, '').trim().toUpperCase();
  return `${cleanCategoryName} - View ${viewIndex + 1}`;
}

function resolveSceneHeading(folderName, filename, viewIndex = 0) {
  const key = getCategoryKey(folderName);
  const num = parseFileNumber(filename);
  if (key && HEADINGS_BY_CATEGORY[key]) {
    const table = HEADINGS_BY_CATEGORY[key];
    if (num !== null && table[num] !== undefined) return table[num];
    if (table[filename] !== undefined) return table[filename];
  }
  return DEFAULT_INITIAL_HEADING;
}

function getSceneHeading(src) {
  if (!src) return DEFAULT_INITIAL_HEADING;
  const clean = decodeURIComponent(src).split('?')[0].split('#')[0].replace(/\\/g, '/');
  const parts = clean.split('/');
  const filename = parts.pop() || '';
  const folderName = parts.pop() || '';
  return resolveSceneHeading(folderName, filename);
}

function makeImageItems(folderName, filenames) {
  return filenames.map((fn, idx) => ({
    filename: fn,
    src: `assets/images/${folderName}/${fn}?v=12.6`,
    thumb: `assets/thumbnails/${folderName}/${fn}?v=12.6`,
    title: resolveSceneTitle(folderName, fn, idx),
    heading: resolveSceneHeading(folderName, fn, idx)
  }));
}

function generateSequence(count, ext = 'jpg') {
  return Array.from({ length: count }, (_, i) => `${i + 1}.${ext}`);
}

const AAKASH_FILENAMES = [
  "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg",
  "9.jpg", "10.jpg", "11.jpg", "12.jpg", "14.jpg", "15.jpg", "16.jpg", "17.jpg",
  "18.jpg", "19.jpg", "20.jpg", "21.jpg", "22.jpg", "23.jpg", "24.jpg", "26.jpg"
];

const CATEGORIES_DATA = [
  {
    folderName: "05 Prithvi",
    displayName: "PRITHVI",
    images: makeImageItems("05 Prithvi", generateSequence(18))
  },
  {
    folderName: "06 Akash",
    displayName: "AKASH",
    images: makeImageItems("06 Akash", AAKASH_FILENAMES)
  },
  {
    folderName: "04 Vayu",
    displayName: "VAYU",
    images: makeImageItems("04 Vayu", generateSequence(4))
  },
  {
    folderName: "07 MPH",
    displayName: "MPH",
    images: makeImageItems("07 MPH", ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.png"])
  },
  {
    folderName: "01 Virat",
    displayName: "VIRAT",
    images: makeImageItems("01 Virat", generateSequence(15))
  },
  {
    folderName: "08 Sagar Setu",
    displayName: "SAGAR SETU",
    images: makeImageItems("08 Sagar Setu", generateSequence(5))
  },
  {
    folderName: "02 Installation",
    displayName: "INSTALLATION",
    images: makeImageItems("02 Installation", generateSequence(8))
  },
  {
    folderName: "09 helipad",
    displayName: "HELIPAD",
    images: makeImageItems("09 helipad", ["1.jpg"])
  },
  {
    folderName: "10 view Point",
    displayName: "VIEW POINT",
    images: makeImageItems("10 view Point", ["1.jpg", "2.jpg"])
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('panolens-container');
  const loaderScreen = document.getElementById('loader-screen');
  const btnStartTour = document.getElementById('btn-start-tour');
  const sceneTopLoader = document.getElementById('scene-top-loader');
  const activeSceneTitle = document.getElementById('active-scene-title');
  const activeSceneTag = document.getElementById('active-scene-tag');
  const compassAngle = document.getElementById('compass-angle');
  const compassIcon = document.getElementById('compass-icon');
  const compassBadge = document.getElementById('compass-badge');

  const categoryTabsContainer = document.getElementById('category-tabs');
  const viewsDrawer = document.getElementById('views-drawer');
  const viewsDrawerContent = document.getElementById('views-drawer-content');

  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const btnAutoRotate = document.getElementById('btn-autorotate');
  const btnFullscreen = document.getElementById('btn-fullscreen');
  const btnZoomIn = document.getElementById('btn-zoomin');
  const btnZoomOut = document.getElementById('btn-zoomout');
  const btnReset = document.getElementById('btn-reset');
  const btnHelp = document.getElementById('btn-help');
  const modalHelp = document.getElementById('modal-help');
  const modalClose = document.getElementById('modal-close');

  let activeCategoryIndex = 0;
  let activeImageIndex = 0;
  let isAutoRotating = true;
  let isExperienceStarted = false;
  let isDrawerHovered = false;
  let isTabsHovered = false;
  let closeDrawerTimer = null;
  let autoRotateResumeTimer = null;
  let lastRenderedCompassAngle = null;

  let accumulatedYawRotation = 0;
  let prevYawAngle = null;
  let isAutoSwitching = false;
  const cameraDirection = new THREE.Vector3();
  const panoramaCache = new Map();

  const viewer = new PANOLENS.Viewer({
    container,
    autoRotate: true,
    autoRotateSpeed: AUTO_ROTATE_SPEED,
    controlBar: false,
    cameraFov: INITIAL_CAMERA_FOV,
    enableReticle: false,
    dwellTime: 1200
  });

  const renderer = viewer.getRenderer();
  if (renderer) {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(pixelRatio);
    if (container) {
      renderer.setSize(container.clientWidth || window.innerWidth, container.clientHeight || window.innerHeight);
    }
  }

  window.addEventListener('resize', () => {
    if (renderer && container) {
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(container.clientWidth || window.innerWidth, container.clientHeight || window.innerHeight);
    }
  });

  if (btnAutoRotate) {
    btnAutoRotate.classList.add('active');
    const icon = btnAutoRotate.querySelector('i');
    if (icon) icon.className = 'ri-pause-line';
  }

  function updateCompassHUD(headingDegrees, force = false) {
    const normAngle = Math.round(((headingDegrees % 360) + 360) % 360);
    if (!force && normAngle === lastRenderedCompassAngle) return;
    lastRenderedCompassAngle = normAngle;

    const compassIndex = Math.round(normAngle / 45) % 8;
    if (compassAngle) {
      compassAngle.textContent = `${normAngle}° ${COMPASS_DIRECTIONS[compassIndex]}`;
    }
    if (compassIcon) {
      compassIcon.style.transform = `rotate(${-normAngle}deg)`;
    }
  }

  function resetCameraToCenter(headingDegrees = DEFAULT_INITIAL_HEADING) {
    const control = viewer.getControl();
    const camera = viewer.getCamera();
    if (!control || !camera) return;

    if (viewer.tweenLeftAnimation && typeof viewer.tweenLeftAnimation.stop === 'function') {
      viewer.tweenLeftAnimation.stop();
    }
    if (viewer.tweenUpAnimation && typeof viewer.tweenUpAnimation.stop === 'function') {
      viewer.tweenUpAnimation.stop();
    }

    if (autoRotateResumeTimer) {
      clearTimeout(autoRotateResumeTimer);
      autoRotateResumeTimer = null;
    }

    const wasAutoRotating = isAutoRotating;
    control.autoRotate = false;

    const rad = (headingDegrees * Math.PI) / 180;
    const radius = 1;

    camera.position.set(-radius * Math.sin(rad), 0, radius * Math.cos(rad));
    camera.lookAt(0, 0, 0);
    camera.fov = INITIAL_CAMERA_FOV;
    camera.updateProjectionMatrix();

    control.maxFov = 110;
    if (control.position0) {
      control.position0.copy(camera.position);
    }
    if (control.target0) {
      control.target0.set(0, 0, 0);
    }
    if (typeof control.reset === 'function') {
      control.reset();
    }
    control.target.set(0, 0, 0);
    camera.fov = INITIAL_CAMERA_FOV;
    camera.updateProjectionMatrix();

    accumulatedYawRotation = 0;
    prevYawAngle = null;

    updateCompassHUD(headingDegrees, true);

    if (wasAutoRotating) {
      autoRotateResumeTimer = setTimeout(() => {
        if (isAutoRotating && control) {
          control.autoRotate = true;
          control.autoRotateSpeed = AUTO_ROTATE_SPEED;
        }
      }, 600);
    }
  }

  function enhancePanoramaResolution(pano) {
    pano.addEventListener('load', () => {
      try {
        const rnd = viewer.getRenderer();
        const maxAniso = rnd && rnd.capabilities ? rnd.capabilities.getMaxAnisotropy() : 16;
        function applySharpness(obj) {
          if (!obj) return;
          if (obj.material && obj.material.map) {
            obj.material.map.anisotropy = maxAniso;
            obj.material.map.generateMipmaps = true;
            obj.material.map.minFilter = THREE.LinearMipMapLinearFilter;
            obj.material.map.magFilter = THREE.LinearFilter;
            obj.material.map.needsUpdate = true;
          }
        }
        if (pano.children && pano.children.length > 0) {
          pano.children.forEach(applySharpness);
        }
        if (pano.mesh) applySharpness(pano.mesh);
        applySharpness(pano);
      } catch (err) {
        console.warn('High-res texture settings notice:', err);
      }
    });
  }

  function createPanorama(src, heading = getSceneHeading(src)) {
    const pano = new PANOLENS.ImagePanorama(src);
    pano.addEventListener('enter-fade-start', () => {
      resetCameraToCenter(heading);
    });
    enhancePanoramaResolution(pano);
    return pano;
  }

  const firstCat = CATEGORIES_DATA[0];
  if (firstCat && firstCat.images[0]) {
    const firstPano = createPanorama(firstCat.images[0].src, firstCat.images[0].heading);
    viewer.add(firstPano);
    viewer.setPanorama(firstPano);
    panoramaCache.set(firstCat.images[0].src, firstPano);
    resetCameraToCenter(firstCat.images[0].heading);
  }

  function startExperience(catIndex = 0, imgIndex = 0) {
    isExperienceStarted = true;
    isAutoRotating = true;
    const control = viewer.getControl();
    if (control) {
      control.autoRotate = true;
      control.autoRotateSpeed = AUTO_ROTATE_SPEED;
    }
    if (btnAutoRotate) {
      btnAutoRotate.classList.add('active');
      const icon = btnAutoRotate.querySelector('i');
      if (icon) icon.className = 'ri-pause-line';
    }
    if (loaderScreen && !loaderScreen.classList.contains('hidden')) {
      loaderScreen.classList.add('hidden');
    }
    switchPanorama(catIndex, imgIndex);
  }

  if (btnStartTour) {
    btnStartTour.addEventListener('click', (e) => {
      e.stopPropagation();
      startExperience(0, 0);
    });
  }

  async function fetchFolderImageList(folderName) {
    try {
      const url = `assets/images/${encodeURIComponent(folderName)}/`;
      const res = await fetch(url, { cache: 'no-store' });
      if (!res.ok) return null;
      const html = await res.text();
      if (!html.includes('<a') && !html.includes('href=')) return null;

      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const links = Array.from(doc.querySelectorAll('a'));
      const imageFiles = [];
      const validExtensions = /\.(jpe?g|png|webp|avif)$/i;

      links.forEach(a => {
        const title = a.getAttribute('title') || '';
        const nameSpan = a.querySelector('.name');
        const spanText = nameSpan ? nameSpan.textContent.trim() : '';
        const text = a.textContent.trim();
        const href = a.getAttribute('href') || '';

        let candidate = title || spanText || text || href.split('/').pop();
        candidate = decodeURIComponent(candidate.split('?')[0].split('#')[0]);

        if (validExtensions.test(candidate) && !candidate.startsWith('.')) {
          imageFiles.push(candidate);
        }
      });

      if (imageFiles.length > 0) {
        const unique = Array.from(new Set(imageFiles));
        unique.sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));
        return unique;
      }
    } catch {
      return null;
    }
    return null;
  }

  function updateCategoryImages(catIndex, fileList) {
    const cat = CATEGORIES_DATA[catIndex];
    if (!cat || !fileList || fileList.length === 0) return false;

    const currentFiles = cat.images.map(img => img.filename).join(',');
    const newFiles = fileList.join(',');

    if (currentFiles === newFiles) return false;

    cat.images = makeImageItems(cat.folderName, fileList);
    return true;
  }

  async function scanCategory(catIndex, forceUpdate = false) {
    const cat = CATEGORIES_DATA[catIndex];
    if (!cat) return;

    try {
      const files = await fetchFolderImageList(cat.folderName);
      if (files && files.length > 0) {
        const changed = updateCategoryImages(catIndex, files);
        if ((changed || forceUpdate) && activeCategoryIndex === catIndex && viewsDrawer && !viewsDrawer.classList.contains('collapsed')) {
          renderDrawer(catIndex, activeImageIndex);
        }
      }
    } catch (err) {
      console.warn(`Scan error for ${cat.displayName}:`, err);
    }
  }

  function openDrawerForCategory(catIndex) {
    if (closeDrawerTimer) {
      clearTimeout(closeDrawerTimer);
      closeDrawerTimer = null;
    }

    activeCategoryIndex = catIndex;

    if (categoryTabsContainer) {
      const tabButtons = categoryTabsContainer.querySelectorAll('.category-tab-btn');
      tabButtons.forEach((btn, idx) => {
        btn.classList.toggle('active', idx === catIndex);
      });
    }

    renderDrawer(catIndex, activeImageIndex);

    if (viewsDrawer) {
      viewsDrawer.classList.remove('collapsed');
    }

    scanCategory(catIndex);
  }

  function scheduleCloseDrawer() {
    if (closeDrawerTimer) clearTimeout(closeDrawerTimer);
    closeDrawerTimer = setTimeout(() => {
      if (!isDrawerHovered && !isTabsHovered && viewsDrawer) {
        viewsDrawer.classList.add('collapsed');
      }
    }, 280);
  }

  function renderCategoryTabs() {
    if (!categoryTabsContainer) return;
    categoryTabsContainer.innerHTML = '';

    CATEGORIES_DATA.forEach((cat, index) => {
      const tabBtn = document.createElement('button');
      tabBtn.className = `category-tab-btn ${index === activeCategoryIndex ? 'active' : ''}`;
      tabBtn.setAttribute('data-category-index', index);
      tabBtn.innerHTML = `<span class="tab-name">${cat.displayName}</span>`;

      tabBtn.addEventListener('mouseenter', () => {
        isTabsHovered = true;
        const allTabs = categoryTabsContainer.querySelectorAll('.category-tab-btn');
        allTabs.forEach((btn, i) => btn.classList.toggle('active', i === index));
        openDrawerForCategory(index);
      });

      tabBtn.addEventListener('mouseleave', () => {
        isTabsHovered = false;
        scheduleCloseDrawer();
      });

      tabBtn.addEventListener('click', () => {
        openDrawerForCategory(index);
        if (!isExperienceStarted) {
          startExperience(index, 0);
        } else {
          switchPanorama(index, 0);
        }
      });

      categoryTabsContainer.appendChild(tabBtn);
    });
  }

  if (viewsDrawer) {
    viewsDrawer.addEventListener('mouseenter', () => {
      isDrawerHovered = true;
      if (closeDrawerTimer) {
        clearTimeout(closeDrawerTimer);
        closeDrawerTimer = null;
      }
      viewsDrawer.classList.remove('collapsed');
    });

    viewsDrawer.addEventListener('mouseleave', () => {
      isDrawerHovered = false;
      scheduleCloseDrawer();
    });
  }

  function preloadNextPanorama(catIndex, currentImgIdx) {
    const cat = CATEGORIES_DATA[catIndex];
    if (!cat || cat.images.length <= 1) return;
    const nextIdx = (currentImgIdx + 1) % cat.images.length;
    const nextItem = cat.images[nextIdx];
    if (!panoramaCache.has(nextItem.src)) {
      const nextPano = createPanorama(nextItem.src, nextItem.heading);
      viewer.add(nextPano);
      panoramaCache.set(nextItem.src, nextPano);
    }
  }

  function renderDrawer(catIndex, currentImgIdx = 0) {
    if (!viewsDrawerContent) return;
    const cat = CATEGORIES_DATA[catIndex];
    if (!cat) return;

    viewsDrawerContent.innerHTML = '';

    if (cat.images.length === 0) {
      viewsDrawerContent.innerHTML = `
        <div style="padding: 24px 16px; text-align: center; color: rgba(255,255,255,0.6); font-size: 13px;">
          No images found in <code>assets/images/${cat.folderName}/</code>
        </div>
      `;
      return;
    }

    cat.images.forEach((imgItem, idx) => {
      const isCardActive = (catIndex === activeCategoryIndex && idx === activeImageIndex);
      const row = document.createElement('div');
      row.className = `drawer-item ${isCardActive ? 'active' : ''}`;
      row.setAttribute('data-img-index', idx);

      const itemTitle = imgItem.title || `${cat.displayName} - View ${idx + 1}`;

      row.innerHTML = `
        <div class="drawer-thumb-wrap">
          <img 
            src="${imgItem.thumb}" 
            onerror="this.onerror=null;this.src='${imgItem.src}'" 
            alt="${itemTitle}" 
            loading="lazy" 
            class="drawer-thumb"
          />
        </div>
        <span class="drawer-item-title">${itemTitle}</span>
      `;

      row.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!isExperienceStarted) {
          startExperience(catIndex, idx);
        } else {
          switchPanorama(catIndex, idx);
        }
      });

      viewsDrawerContent.appendChild(row);
    });

    const activeItem = viewsDrawerContent.children[currentImgIdx];
    if (activeItem) {
      activeItem.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  function switchPanorama(catIndex, imgIndex) {
    activeCategoryIndex = catIndex;
    activeImageIndex = imgIndex;

    const cat = CATEGORIES_DATA[catIndex];
    if (!cat || !cat.images[imgIndex]) return;
    const imgItem = cat.images[imgIndex];
    const heading = imgItem.heading ?? getSceneHeading(imgItem.src);

    resetCameraToCenter(heading);

    if (categoryTabsContainer) {
      const allTabs = categoryTabsContainer.querySelectorAll('.category-tab-btn');
      allTabs.forEach((btn, i) => btn.classList.toggle('active', i === catIndex));
    }

    if (activeSceneTitle) activeSceneTitle.textContent = imgItem.title;
    if (activeSceneTag) activeSceneTag.textContent = `View ${imgIndex + 1} of ${cat.images.length}`;

    if (viewsDrawerContent) {
      const rows = viewsDrawerContent.querySelectorAll('.drawer-item');
      rows.forEach((row, idx) => {
        const isActive = idx === imgIndex;
        row.classList.toggle('active', isActive);
        if (isActive) {
          row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    }

    if (isExperienceStarted && sceneTopLoader) {
      sceneTopLoader.classList.remove('hidden');
      sceneTopLoader.style.width = '40%';
    }

    let pano = panoramaCache.get(imgItem.src);
    if (!pano) {
      pano = createPanorama(imgItem.src, heading);

      pano.addEventListener('progress', (e) => {
        if (e.progress && e.progress.total && isExperienceStarted && sceneTopLoader) {
          const pct = Math.round((e.progress.loaded / e.progress.total) * 100) || 40;
          sceneTopLoader.style.width = `${pct}%`;
        }
      });

      pano.addEventListener('load', () => {
        if (isExperienceStarted && sceneTopLoader) {
          sceneTopLoader.style.width = '100%';
          setTimeout(() => {
            sceneTopLoader.classList.add('hidden');
            sceneTopLoader.style.width = '0%';
          }, 250);
        }
        resetCameraToCenter(heading);
        preloadNextPanorama(catIndex, imgIndex);
      });

      pano.addEventListener('error', () => {
        console.error('Failed to load panorama:', imgItem.src);
        if (sceneTopLoader) sceneTopLoader.classList.add('hidden');
      });

      viewer.add(pano);
      panoramaCache.set(imgItem.src, pano);
    } else {
      if (isExperienceStarted && sceneTopLoader) {
        sceneTopLoader.style.width = '100%';
        setTimeout(() => {
          sceneTopLoader.classList.add('hidden');
          sceneTopLoader.style.width = '0%';
        }, 150);
      }
      resetCameraToCenter(heading);
      preloadNextPanorama(catIndex, imgIndex);
    }

    viewer.setPanorama(pano);
  }

  function navigateScene(direction) {
    const cat = CATEGORIES_DATA[activeCategoryIndex];
    if (!cat || !cat.images || cat.images.length === 0) return;
    const targetIdx = (activeImageIndex + direction + cat.images.length) % cat.images.length;
    if (!isExperienceStarted) {
      startExperience(activeCategoryIndex, targetIdx);
    } else {
      switchPanorama(activeCategoryIndex, targetIdx);
    }
  }

  function adjustZoom(delta) {
    if (!isExperienceStarted) startExperience();
    const camera = viewer.getCamera();
    if (camera) {
      camera.fov = Math.min(100, Math.max(30, camera.fov + delta));
      camera.updateProjectionMatrix();
    }
  }

  function resetToActiveHeading() {
    if (!isExperienceStarted) startExperience();
    const cat = CATEGORIES_DATA[activeCategoryIndex];
    const imgItem = cat && cat.images[activeImageIndex];
    const heading = imgItem ? (imgItem.heading ?? getSceneHeading(imgItem.src)) : DEFAULT_INITIAL_HEADING;
    resetCameraToCenter(heading);
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => navigateScene(-1));
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => navigateScene(1));
  }

  if (btnAutoRotate) {
    btnAutoRotate.addEventListener('click', () => {
      if (!isExperienceStarted) startExperience();
      isAutoRotating = !isAutoRotating;
      const control = viewer.getControl();
      if (control) {
        control.autoRotate = isAutoRotating;
        control.autoRotateSpeed = AUTO_ROTATE_SPEED;
      }
      btnAutoRotate.classList.toggle('active', isAutoRotating);
      const icon = btnAutoRotate.querySelector('i');
      if (icon) icon.className = isAutoRotating ? 'ri-pause-line' : 'ri-play-line';
      accumulatedYawRotation = 0;
    });
  }

  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      if (!isExperienceStarted) startExperience();
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    });

    document.addEventListener('fullscreenchange', () => {
      const isFS = !!document.fullscreenElement;
      btnFullscreen.classList.toggle('active', isFS);
      const icon = btnFullscreen.querySelector('i');
      if (icon) icon.className = isFS ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line';
    });
  }

  if (btnZoomIn) {
    btnZoomIn.addEventListener('click', () => adjustZoom(-10));
  }

  if (btnZoomOut) {
    btnZoomOut.addEventListener('click', () => adjustZoom(10));
  }

  if (btnReset) {
    btnReset.addEventListener('click', resetToActiveHeading);
  }

  if (compassBadge) {
    compassBadge.addEventListener('click', resetToActiveHeading);
  }

  if (btnHelp) {
    btnHelp.addEventListener('click', () => {
      if (modalHelp) modalHelp.classList.add('active');
    });
  }

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      if (modalHelp) modalHelp.classList.remove('active');
    });
  }

  if (modalHelp) {
    modalHelp.addEventListener('click', (e) => {
      if (e.target === modalHelp) modalHelp.classList.remove('active');
    });
  }

  viewer.addUpdateCallback(() => {
    const camera = viewer.getCamera();
    if (!camera) return;

    camera.getWorldDirection(cameraDirection);
    let angle = Math.atan2(cameraDirection.x, -cameraDirection.z) * (180 / Math.PI);
    angle = Math.round((angle + 360) % 360);

    updateCompassHUD(angle);

    if (!isExperienceStarted) return;

    if (prevYawAngle !== null && !isAutoSwitching) {
      let deltaAngle = angle - prevYawAngle;
      if (deltaAngle > 180) deltaAngle -= 360;
      if (deltaAngle < -180) deltaAngle += 360;

      if (isAutoRotating) {
        accumulatedYawRotation += Math.abs(deltaAngle);

        if (accumulatedYawRotation >= 355) {
          accumulatedYawRotation = 0;
          isAutoSwitching = true;

          const cat = CATEGORIES_DATA[activeCategoryIndex];
          let nextCatIdx = activeCategoryIndex;
          let nextImgIdx = activeImageIndex + 1;

          if (cat && nextImgIdx >= cat.images.length) {
            nextCatIdx = (activeCategoryIndex + 1) % CATEGORIES_DATA.length;
            nextImgIdx = 0;
          }

          switchPanorama(nextCatIdx, nextImgIdx);

          setTimeout(() => {
            isAutoSwitching = false;
            accumulatedYawRotation = 0;
          }, 2000);
        }
      }
    }
    prevYawAngle = angle;
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'f' || e.key === 'F') {
      if (btnFullscreen) btnFullscreen.click();
    } else if (e.key === 'r' || e.key === 'R') {
      if (btnReset) btnReset.click();
    } else if (e.key === ' ') {
      e.preventDefault();
      if (btnAutoRotate) btnAutoRotate.click();
    } else if (e.key === 'Escape') {
      if (modalHelp && modalHelp.classList.contains('active')) {
        modalHelp.classList.remove('active');
      } else if (viewsDrawer) {
        viewsDrawer.classList.add('collapsed');
      }
    }
  });

  renderCategoryTabs();
  renderDrawer(0, 0);
  if (activeSceneTitle) activeSceneTitle.textContent = 'URJA BHARAT CONVENTION CENTRE';

  if (viewsDrawer) {
    viewsDrawer.classList.add('collapsed');
  }
});
