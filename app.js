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


class TourCatalog {
  constructor() {
    const specs = [
      ['05 Prithvi', 'PRITHVI', TourCatalog.sequence(18)],
      ['06 Akash', 'AKASH', [
        '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg',
        '9.jpg', '10.jpg', '11.jpg', '12.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg',
        '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '26.jpg'
      ]],
      ['04 Vayu', 'VAYU', TourCatalog.sequence(4)],
      ['07 MPH', 'MPH', ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.png']],
      ['01 Virat', 'VIRAT', TourCatalog.sequence(15)],
      ['08 Sagar Setu', 'SAGAR SETU', TourCatalog.sequence(5)],
      ['02 Installation', 'INSTALLATION', TourCatalog.sequence(8)],
      ['09 helipad', 'HELIPAD', ['1.jpg']],
      ['10 view Point', 'VIEW POINT', ['1.jpg', '2.jpg']]
    ];

    this.categories = specs.map(([folderName, displayName, filenames]) => ({
      folderName,
      displayName,
      images: this.makeImageItems(folderName, filenames)
    }));
  }

  static sequence(count, ext = 'jpg') {
    return Array.from({ length: count }, (_, index) => `${index + 1}.${ext}`);
  }

  static categoryKey(folderName) {
    const name = (folderName || '').toLowerCase();
    if (name.includes('prithvi') || name.includes('prathvi')) return 'prithvi';
    if (name.includes('akash') || name.includes('aakash')) return 'akash';
    if (name.includes('vayu')) return 'vayu';
    if (name.includes('mph')) return 'mph';
    if (name.includes('virat')) return 'virat';
    if (name.includes('sagar setu')) return 'sagar setu';
    if (name.includes('installation')) return 'installation';
    if (name.includes('helipad')) return 'helipad';
    if (name.includes('view point')) return 'view point';
    if (name.includes('exterier') || name.includes('exterior')) return 'exterier';
    return null;
  }

  static fileNumber(filename) {
    const match = String(filename || '').match(/(?:^|\/)(\d+)\.[a-z0-9]+$/i);
    return match ? Number.parseInt(match[1], 10) : null;
  }

  static title(folderName, filename, viewIndex = 0) {
    const key = TourCatalog.categoryKey(folderName);
    const table = TITLES_BY_CATEGORY[key];
    const number = TourCatalog.fileNumber(filename);
    if (table) {
      if (number !== null && table[number]) return table[number];
      if (table[filename]) return table[filename];
    }
    if (key === 'helipad') return 'HELIPAD';
    const name = (folderName || '').replace(/^\d+\s*/, '').trim().toUpperCase();
    return `${name} - View ${viewIndex + 1}`;
  }

  static heading(folderName, filename) {
    const key = TourCatalog.categoryKey(folderName);
    const table = HEADINGS_BY_CATEGORY[key];
    const number = TourCatalog.fileNumber(filename);
    if (table) {
      if (number !== null && table[number] !== undefined) return table[number];
      if (table[filename] !== undefined) return table[filename];
    }
    return DEFAULT_INITIAL_HEADING;
  }

  static headingFromSrc(src) {
    if (!src) return DEFAULT_INITIAL_HEADING;
    const clean = decodeURIComponent(src).split('?')[0].split('#')[0].replace(/\\/g, '/');
    const parts = clean.split('/');
    const filename = parts.pop() || '';
    const folderName = parts.pop() || '';
    return TourCatalog.heading(folderName, filename);
  }

  makeImageItems(folderName, filenames) {
    return filenames.map((filename, index) => ({
      filename,
      src: `assets/images/${folderName}/${filename}?v=12.6`,
      thumb: `assets/thumbnails/${folderName}/${filename}?v=12.6`,
      title: TourCatalog.title(folderName, filename, index),
      heading: TourCatalog.heading(folderName, filename)
    }));
  }

  async scanFolder(folderName) {
    try {
      const response = await fetch(`assets/images/${encodeURIComponent(folderName)}/`, {
        cache: 'no-store'
      });
      if (!response.ok) return null;

      const html = await response.text();
      if (!html.includes('<a') && !html.includes('href=')) return null;

      const doc = new DOMParser().parseFromString(html, 'text/html');
      const files = Array.from(doc.querySelectorAll('a'), (anchor) => {
        const title = anchor.getAttribute('title') || '';
        const span = anchor.querySelector('.name');
        const label = span ? span.textContent.trim() : '';
        const text = anchor.textContent.trim();
        const href = anchor.getAttribute('href') || '';
        const candidate = title || label || text || href.split('/').pop();
        return decodeURIComponent(candidate.split('?')[0].split('#')[0]);
      }).filter((name) => /\.(jpe?g|png|webp|avif)$/i.test(name) && !name.startsWith('.'));

      if (!files.length) return null;
      return [...new Set(files)].sort((a, b) => a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: 'base'
      }));
    } catch {
      return null;
    }
  }

  updateImages(categoryIndex, filenames) {
    const category = this.categories[categoryIndex];
    if (!category || !filenames?.length) return false;
    if (category.images.map(({ filename }) => filename).join(',') === filenames.join(',')) {
      return false;
    }
    category.images = this.makeImageItems(category.folderName, filenames);
    return true;
  }
}

/**
 * Owns viewer, state, event handlers and timers; no dependencies on a bundler.
 * Expects the existing DOM IDs, CSS, THREE and PANOLENS scripts on the page.
 */
class PanoramaTourApp {
  constructor(catalog = new TourCatalog()) {
    this.catalog = catalog;
    this.categories = catalog.categories;
    this.dom = {};
    this.viewer = null;
    this.renderer = null;
    this.panoramaCache = new Map();
    this.cameraDirection = new THREE.Vector3();

    this.activeCategoryIndex = 0;
    this.activeImageIndex = 0;
    this.isAutoRotating = true;
    this.isExperienceStarted = false;
    this.isDrawerHovered = false;
    this.isTabsHovered = false;
    this.isAutoSwitching = false;
    this.lastRenderedCompassAngle = null;
    this.accumulatedYawRotation = 0;
    this.prevYawAngle = null;
    this.currentImageSrc = null;

    this.timers = {
      closeDrawer: null,
      resumeRotation: null,
      sceneLoader: null,
      autoSwitch: null
    };
  }

  init() {
    const ids = {
      container: 'panolens-container',
      loaderScreen: 'loader-screen',
      btnStartTour: 'btn-start-tour',
      sceneTopLoader: 'scene-top-loader',
      activeSceneTitle: 'active-scene-title',
      activeSceneTag: 'active-scene-tag',
      compassAngle: 'compass-angle',
      compassIcon: 'compass-icon',
      compassBadge: 'compass-badge',
      categoryTabs: 'category-tabs',
      viewsDrawer: 'views-drawer',
      viewsDrawerContent: 'views-drawer-content',
      btnPrev: 'btn-prev',
      btnNext: 'btn-next',
      btnAutoRotate: 'btn-autorotate',
      btnFullscreen: 'btn-fullscreen',
      btnZoomIn: 'btn-zoomin',
      btnZoomOut: 'btn-zoomout',
      btnReset: 'btn-reset',
      btnHelp: 'btn-help',
      modalHelp: 'modal-help',
      modalClose: 'modal-close'
    };
    for (const [name, id] of Object.entries(ids)) {
      this.dom[name] = document.getElementById(id);
    }
    if (!this.dom.container) {
      console.error('Panorama viewer container #panolens-container was not found.');
      return;
    }

    this.viewer = new PANOLENS.Viewer({
      container: this.dom.container,
      autoRotate: true,
      autoRotateSpeed: AUTO_ROTATE_SPEED,
      controlBar: false,
      cameraFov: INITIAL_CAMERA_FOV,
      enableReticle: false,
      dwellTime: 1200
    });
    this.renderer = this.viewer.getRenderer();
    this.resizeViewer();

    this.updateAutoRotateButton();
    this.bindEvents();
    this.renderCategoryTabs();
    this.renderDrawer(0, 0);
    this.dom.viewsDrawer?.classList.add('collapsed');
    if (this.dom.activeSceneTitle) {
      this.dom.activeSceneTitle.textContent = 'URJA BHARAT CONVENTION CENTRE';
    }

    // Start loading the first panorama while the intro screen is still visible.
    const firstImage = this.categories[0]?.images[0];
    if (firstImage) {
      const panorama = this.createPanorama(firstImage.src, firstImage.heading);
      this.viewer.add(panorama);
      this.viewer.setPanorama(panorama);
      this.panoramaCache.set(firstImage.src, panorama);
      this.resetCameraToCenter(firstImage.heading);
      this.currentImageSrc = firstImage.src;
    }
  }

  clearTimer(name) {
    if (this.timers[name] !== null) {
      clearTimeout(this.timers[name]);
      this.timers[name] = null;
    }
  }

  resizeViewer() {
    if (!this.renderer || !this.dom.container) return;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setSize(
      this.dom.container.clientWidth || window.innerWidth,
      this.dom.container.clientHeight || window.innerHeight
    );
  }

  updateAutoRotateButton() {
    const button = this.dom.btnAutoRotate;
    if (!button) return;
    button.classList.toggle('active', this.isAutoRotating);
    const icon = button.querySelector('i');
    if (icon) icon.className = this.isAutoRotating ? 'ri-pause-line' : 'ri-play-line';
  }

  updateCompassHUD(headingDegrees, force = false) {
    const angle = Math.round(((headingDegrees % 360) + 360) % 360);
    if (!force && angle === this.lastRenderedCompassAngle) return;
    this.lastRenderedCompassAngle = angle;
    const direction = COMPASS_DIRECTIONS[Math.round(angle / 45) % 8];
    if (this.dom.compassAngle) this.dom.compassAngle.textContent = `${angle}° ${direction}`;
    if (this.dom.compassIcon) this.dom.compassIcon.style.transform = `rotate(${-angle}deg)`;
  }

  resetCameraToCenter(headingDegrees = DEFAULT_INITIAL_HEADING) {
    const control = this.viewer.getControl();
    const camera = this.viewer.getCamera();
    if (!control || !camera) return;

    this.viewer.tweenLeftAnimation?.stop?.();
    this.viewer.tweenUpAnimation?.stop?.();
    this.clearTimer('resumeRotation');

    const resumeAutoRotation = this.isAutoRotating;
    control.autoRotate = false;
    const radians = (headingDegrees * Math.PI) / 180;
    camera.position.set(-Math.sin(radians), 0, Math.cos(radians));
    camera.lookAt(0, 0, 0);
    camera.fov = INITIAL_CAMERA_FOV;
    camera.updateProjectionMatrix();

    control.maxFov = 110;
    if (control.position0) control.position0.copy(camera.position);
    if (control.target0) control.target0.set(0, 0, 0);
    if (typeof control.reset === 'function') control.reset();
    control.target.set(0, 0, 0);
    camera.fov = INITIAL_CAMERA_FOV;
    camera.updateProjectionMatrix();

    this.accumulatedYawRotation = 0;
    this.prevYawAngle = null;
    this.updateCompassHUD(headingDegrees, true);

    if (resumeAutoRotation) {
      this.timers.resumeRotation = setTimeout(() => {
        if (this.isAutoRotating) {
          control.autoRotate = true;
          control.autoRotateSpeed = AUTO_ROTATE_SPEED;
        }
        this.timers.resumeRotation = null;
      }, 600);
    }
  }

  enhancePanoramaResolution(panorama) {
    panorama.addEventListener('load', () => {
      try {
        const renderer = this.viewer.getRenderer();
        const anisotropy = renderer?.capabilities?.getMaxAnisotropy() ?? 16;
        const sharpen = (object) => {
          const map = object?.material?.map;
          if (!map) return;
          map.anisotropy = anisotropy;
          map.generateMipmaps = true;
          map.minFilter = THREE.LinearMipMapLinearFilter;
          map.magFilter = THREE.LinearFilter;
          map.needsUpdate = true;
        };
        panorama.children?.forEach(sharpen);
        sharpen(panorama.mesh);
        sharpen(panorama);
      } catch (error) {
        console.warn('High-res texture settings notice:', error);
      }
    });
  }

  createPanorama(src, heading = TourCatalog.headingFromSrc(src)) {
    const panorama = new PANOLENS.ImagePanorama(src);
    panorama.addEventListener('enter-fade-start', () => {
      // A preloaded panorama still needs its own heading when entered.
      if (this.currentImageSrc === src) this.resetCameraToCenter(heading);
    });
    this.enhancePanoramaResolution(panorama);
    return panorama;
  }

  startExperience(categoryIndex = 0, imageIndex = 0) {
    this.isExperienceStarted = true;
    this.isAutoRotating = true;
    const control = this.viewer.getControl();
    if (control) {
      control.autoRotate = true;
      control.autoRotateSpeed = AUTO_ROTATE_SPEED;
    }
    this.updateAutoRotateButton();
    this.dom.loaderScreen?.classList.add('hidden');
    this.switchPanorama(categoryIndex, imageIndex);
  }

  async scanCategory(categoryIndex, forceUpdate = false) {
    const category = this.categories[categoryIndex];
    if (!category) return;
    try {
      const filenames = await this.catalog.scanFolder(category.folderName);
      if (!filenames?.length) return;
      const changed = this.catalog.updateImages(categoryIndex, filenames);
      if ((changed || forceUpdate) && this.activeCategoryIndex === categoryIndex &&
        this.dom.viewsDrawer && !this.dom.viewsDrawer.classList.contains('collapsed')) {
        this.renderDrawer(categoryIndex, this.activeImageIndex);
      }
    } catch (error) {
      console.warn(`Scan error for ${category.displayName}:`, error);
    }
  }

  openDrawerForCategory(categoryIndex) {
    this.clearTimer('closeDrawer');
    this.activeCategoryIndex = categoryIndex;
    this.updateActiveTabs(categoryIndex);
    this.renderDrawer(categoryIndex, this.activeImageIndex);
    this.dom.viewsDrawer?.classList.remove('collapsed');
    void this.scanCategory(categoryIndex);
  }

  scheduleCloseDrawer() {
    this.clearTimer('closeDrawer');
    this.timers.closeDrawer = setTimeout(() => {
      if (!this.isDrawerHovered && !this.isTabsHovered) {
        this.dom.viewsDrawer?.classList.add('collapsed');
      }
      this.timers.closeDrawer = null;
    }, 280);
  }

  updateActiveTabs(categoryIndex) {
    this.dom.categoryTabs?.querySelectorAll('.category-tab-btn').forEach((button, index) => {
      button.classList.toggle('active', index === categoryIndex);
    });
  }

  renderCategoryTabs() {
    const container = this.dom.categoryTabs;
    if (!container) return;
    container.replaceChildren();

    this.categories.forEach((category, index) => {
      const button = document.createElement('button');
      button.className = `category-tab-btn ${index === this.activeCategoryIndex ? 'active' : ''}`;
      button.dataset.categoryIndex = String(index);
      const title = document.createElement('span');
      title.className = 'tab-name';
      title.textContent = category.displayName;
      button.appendChild(title);

      button.addEventListener('mouseenter', () => {
        this.isTabsHovered = true;
        this.openDrawerForCategory(index);
      });
      button.addEventListener('mouseleave', () => {
        this.isTabsHovered = false;
        this.scheduleCloseDrawer();
      });
      button.addEventListener('click', () => {
        this.openDrawerForCategory(index);
        if (this.isExperienceStarted) this.switchPanorama(index, 0);
        else this.startExperience(index, 0);
      });
      container.appendChild(button);
    });
  }

  renderDrawer(categoryIndex, currentImageIndex = 0) {
    const container = this.dom.viewsDrawerContent;
    const category = this.categories[categoryIndex];
    if (!container || !category) return;
    container.replaceChildren();

    if (!category.images.length) {
      const message = document.createElement('div');
      message.style.cssText = 'padding:24px 16px;text-align:center;color:rgba(255,255,255,.6);font-size:13px';
      message.append('No images found in ');
      const code = document.createElement('code');
      code.textContent = `assets/images/${category.folderName}/`;
      message.appendChild(code);
      container.appendChild(message);
      return;
    }

    const fragment = document.createDocumentFragment();
    category.images.forEach((image, index) => {
      const row = document.createElement('div');
      const active = categoryIndex === this.activeCategoryIndex && index === this.activeImageIndex;
      row.className = `drawer-item ${active ? 'active' : ''}`;
      row.dataset.imgIndex = String(index);

      const thumbnailWrap = document.createElement('div');
      thumbnailWrap.className = 'drawer-thumb-wrap';
      const thumbnail = document.createElement('img');
      thumbnail.src = image.thumb;
      thumbnail.alt = image.title || `${category.displayName} - View ${index + 1}`;
      thumbnail.loading = 'lazy';
      thumbnail.className = 'drawer-thumb';
      thumbnail.addEventListener('error', () => {
        // Use the full-size image if the thumbnail does not exist (once only).
        thumbnail.src = image.src;
      }, { once: true });
      thumbnailWrap.appendChild(thumbnail);

      const title = document.createElement('span');
      title.className = 'drawer-item-title';
      title.textContent = thumbnail.alt;
      row.append(thumbnailWrap, title);
      row.addEventListener('click', (event) => {
        event.stopPropagation();
        if (this.isExperienceStarted) this.switchPanorama(categoryIndex, index);
        else this.startExperience(categoryIndex, index);
      });
      fragment.appendChild(row);
    });
    container.appendChild(fragment);
    container.children[currentImageIndex]?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  preloadNextPanorama(categoryIndex, currentImageIndex) {
    const category = this.categories[categoryIndex];
    if (!category || category.images.length <= 1) return;
    const nextImage = category.images[(currentImageIndex + 1) % category.images.length];
    if (this.panoramaCache.has(nextImage.src)) return;
    const panorama = this.createPanorama(nextImage.src, nextImage.heading);
    this.viewer.add(panorama);
    this.panoramaCache.set(nextImage.src, panorama);
  }

  updateSceneLabels(image, imageIndex, total) {
    if (this.dom.activeSceneTitle) this.dom.activeSceneTitle.textContent = image.title;
    if (this.dom.activeSceneTag) {
      this.dom.activeSceneTag.textContent = `View ${imageIndex + 1} of ${total}`;
    }
    this.updateActiveTabs(this.activeCategoryIndex);
    this.dom.viewsDrawerContent?.querySelectorAll('.drawer-item').forEach((row, index) => {
      const active = index === imageIndex;
      row.classList.toggle('active', active);
      if (active) row.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  }

  showSceneLoader() {
    if (!this.isExperienceStarted || !this.dom.sceneTopLoader) return;
    this.clearTimer('sceneLoader');
    this.dom.sceneTopLoader.classList.remove('hidden');
    this.dom.sceneTopLoader.style.width = '40%';
  }

  hideSceneLoader(delay) {
    if (!this.isExperienceStarted || !this.dom.sceneTopLoader) return;
    this.clearTimer('sceneLoader');
    this.dom.sceneTopLoader.style.width = '100%';
    this.timers.sceneLoader = setTimeout(() => {
      this.dom.sceneTopLoader.classList.add('hidden');
      this.dom.sceneTopLoader.style.width = '0%';
      this.timers.sceneLoader = null;
    }, delay);
  }

  switchPanorama(categoryIndex, imageIndex) {
    const category = this.categories[categoryIndex];
    const image = category?.images[imageIndex];
    if (!image) return;

    this.activeCategoryIndex = categoryIndex;
    this.activeImageIndex = imageIndex;
    this.currentImageSrc = image.src;
    const heading = image.heading ?? TourCatalog.headingFromSrc(image.src);

    this.resetCameraToCenter(heading);
    this.updateSceneLabels(image, imageIndex, category.images.length);
    this.showSceneLoader();

    let panorama = this.panoramaCache.get(image.src);
    if (!panorama) {
      panorama = this.createPanorama(image.src, heading);
      panorama.addEventListener('progress', (event) => {
        if (this.currentImageSrc !== image.src || !this.isExperienceStarted || !this.dom.sceneTopLoader) return;
        if (event.progress?.total) {
          const percent = Math.round((event.progress.loaded / event.progress.total) * 100) || 40;
          this.dom.sceneTopLoader.style.width = `${percent}%`;
        }
      });
      panorama.addEventListener('load', () => {
        if (this.currentImageSrc !== image.src) return;
        this.hideSceneLoader(250);
        this.resetCameraToCenter(heading);
        this.preloadNextPanorama(categoryIndex, imageIndex);
      });
      panorama.addEventListener('error', () => {
        console.error('Failed to load panorama:', image.src);
        if (this.currentImageSrc === image.src) {
          this.clearTimer('sceneLoader');
          this.dom.sceneTopLoader?.classList.add('hidden');
        }
      });
      this.viewer.add(panorama);
      this.panoramaCache.set(image.src, panorama);
    } else {
      this.hideSceneLoader(150);
      this.resetCameraToCenter(heading);
      this.preloadNextPanorama(categoryIndex, imageIndex);
    }
    this.viewer.setPanorama(panorama);
  }

  navigateScene(direction) {
    const category = this.categories[this.activeCategoryIndex];
    if (!category?.images.length) return;
    const index = (this.activeImageIndex + direction + category.images.length) % category.images.length;
    if (this.isExperienceStarted) this.switchPanorama(this.activeCategoryIndex, index);
    else this.startExperience(this.activeCategoryIndex, index);
  }

  adjustZoom(delta) {
    if (!this.isExperienceStarted) this.startExperience();
    const camera = this.viewer.getCamera();
    if (!camera) return;
    camera.fov = Math.min(100, Math.max(30, camera.fov + delta));
    camera.updateProjectionMatrix();
  }

  resetToActiveHeading() {
    if (!this.isExperienceStarted) this.startExperience();
    const image = this.categories[this.activeCategoryIndex]?.images[this.activeImageIndex];
    this.resetCameraToCenter(image?.heading ?? DEFAULT_INITIAL_HEADING);
  }

  toggleAutoRotate() {
    if (!this.isExperienceStarted) this.startExperience();
    this.isAutoRotating = !this.isAutoRotating;
    this.clearTimer('resumeRotation');
    const control = this.viewer.getControl();
    if (control) {
      control.autoRotate = this.isAutoRotating;
      control.autoRotateSpeed = AUTO_ROTATE_SPEED;
    }
    this.updateAutoRotateButton();
    this.accumulatedYawRotation = 0;
  }

  toggleFullscreen() {
    if (!this.isExperienceStarted) this.startExperience();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => { });
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  updateFullscreenButton() {
    const button = this.dom.btnFullscreen;
    if (!button) return;
    const fullscreen = !!document.fullscreenElement;
    button.classList.toggle('active', fullscreen);
    const icon = button.querySelector('i');
    if (icon) icon.className = fullscreen ? 'ri-fullscreen-exit-line' : 'ri-fullscreen-line';
  }

  advanceAfterFullRotation() {
    const category = this.categories[this.activeCategoryIndex];
    let nextCategoryIndex = this.activeCategoryIndex;
    let nextImageIndex = this.activeImageIndex + 1;
    if (category && nextImageIndex >= category.images.length) {
      nextCategoryIndex = (nextCategoryIndex + 1) % this.categories.length;
      nextImageIndex = 0;
    }
    this.isAutoSwitching = true;
    this.accumulatedYawRotation = 0;
    this.switchPanorama(nextCategoryIndex, nextImageIndex);
    this.clearTimer('autoSwitch');
    this.timers.autoSwitch = setTimeout(() => {
      this.isAutoSwitching = false;
      this.accumulatedYawRotation = 0;
      this.timers.autoSwitch = null;
    }, 2000);
  }

  onViewerUpdate() {
    const camera = this.viewer.getCamera();
    if (!camera) return;
    camera.getWorldDirection(this.cameraDirection);
    const rawAngle = Math.atan2(this.cameraDirection.x, -this.cameraDirection.z) * (180 / Math.PI);
    const angle = Math.round((rawAngle + 360) % 360);
    this.updateCompassHUD(angle);
    if (!this.isExperienceStarted) return;

    if (this.prevYawAngle !== null && !this.isAutoSwitching) {
      let delta = angle - this.prevYawAngle;
      if (delta > 180) delta -= 360;
      if (delta < -180) delta += 360;
      if (this.isAutoRotating) {
        this.accumulatedYawRotation += Math.abs(delta);
        if (this.accumulatedYawRotation >= 355) this.advanceAfterFullRotation();
      }
    }
    this.prevYawAngle = angle;
  }

  onKeyDown(event) {
    if (event.key === 'f' || event.key === 'F') this.dom.btnFullscreen?.click();
    else if (event.key === 'r' || event.key === 'R') this.dom.btnReset?.click();
    else if (event.key === ' ') {
      event.preventDefault();
      this.dom.btnAutoRotate?.click();
    } else if (event.key === 'Escape') {
      if (this.dom.modalHelp?.classList.contains('active')) {
        this.dom.modalHelp.classList.remove('active');
      } else {
        this.dom.viewsDrawer?.classList.add('collapsed');
      }
    }
  }

  bindEvents() {
    const bind = (name, handler) => this.dom[name]?.addEventListener('click', handler);
    bind('btnStartTour', (event) => {
      event.stopPropagation();
      this.startExperience(0, 0);
    });
    bind('btnPrev', () => this.navigateScene(-1));
    bind('btnNext', () => this.navigateScene(1));
    bind('btnAutoRotate', () => this.toggleAutoRotate());
    bind('btnFullscreen', () => this.toggleFullscreen());
    bind('btnZoomIn', () => this.adjustZoom(-10));
    bind('btnZoomOut', () => this.adjustZoom(10));
    bind('btnReset', () => this.resetToActiveHeading());
    bind('compassBadge', () => this.resetToActiveHeading());
    bind('btnHelp', () => this.dom.modalHelp?.classList.add('active'));
    bind('modalClose', () => this.dom.modalHelp?.classList.remove('active'));
    bind('modalHelp', (event) => {
      if (event.target === this.dom.modalHelp) this.dom.modalHelp.classList.remove('active');
    });

    this.dom.viewsDrawer?.addEventListener('mouseenter', () => {
      this.isDrawerHovered = true;
      this.clearTimer('closeDrawer');
      this.dom.viewsDrawer.classList.remove('collapsed');
    });
    this.dom.viewsDrawer?.addEventListener('mouseleave', () => {
      this.isDrawerHovered = false;
      this.scheduleCloseDrawer();
    });

    window.addEventListener('resize', () => this.resizeViewer());
    document.addEventListener('fullscreenchange', () => this.updateFullscreenButton());
    document.addEventListener('keydown', (event) => this.onKeyDown(event));
    this.viewer.addUpdateCallback(() => this.onViewerUpdate());
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PanoramaTourApp().init();
});