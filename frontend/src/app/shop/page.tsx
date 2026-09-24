import { ShoppingBag } from 'lucide-react';

export default function ShopPage() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-container flex-col items-center justify-center px-[clamp(16px,4vw,24px)] py-[clamp(56px,8vw,96px)] text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50">
        <ShoppingBag size={36} className="text-blue" />
      </div>
      <h1 className="mt-8 text-[clamp(30px,4vw,44px)] font-extrabold leading-[1.14] tracking-[-.03em]">
        Shop coming soon
      </h1>
      <p className="mt-4 max-w-[42ch] text-base leading-[1.7] text-muted-alt">
        We are working on exclusive OSS Cameroon merch and goodies. Stay tuned for t-shirts, stickers, and more to show your support for the community.
      </p>
      <div className="mt-8 rounded-xl border border-border-soft bg-grey-50 px-8 py-5">
        <p className="text-[15px] font-semibold text-ink">Want to be notified when we launch?</p>
        <p className="mt-1 text-[14px] text-muted-alt">
          Follow us on{' '}
          <a href="https://twitter.com/osscameroon" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue hover:underline">Twitter</a>
          {' '}or join our{' '}
          <a href="https://t.me/+UpKZh_KXTaTx7JD7" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue hover:underline">Telegram</a>
          {' '}group.
        </p>
      </div>
    </section>
  );
}
